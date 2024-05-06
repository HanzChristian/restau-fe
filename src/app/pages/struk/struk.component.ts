import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IResponse } from 'src/app/interfaces/i-response';
import { StrukService } from 'src/app/services/struk.service';
import { UserService } from 'src/app/services/user.service';
import { ITransaksi } from 'src/app/interfaces/i-transaksi';
import Swal from 'sweetalert2';
import { jsPDF }  from 'jspdf';
import autoTable from 'jspdf-autotable'


@Component({
  selector: 'app-struk',
  templateUrl: './struk.component.html',
  styleUrls: ['./struk.component.css']
})
export class StrukComponent implements OnInit{
  struks: any[] = [];
  transaksis: { namaMenu: string, jumlahMenu: number, hargaMenu: number, totalHarga: number }[] = [];
  fetchError = false;
  search = '';
  pageSize = 10;
  page = 0;
  totalPages = 0;
  sort = {
    key:'id',
    order:'desc'
  };

  constructor(private strukService:StrukService,private router:Router,private userService: UserService,private modalService: NgbModal){}

  ngOnInit(){
    this.sortData(this.sort.key);
  }

  sortData(key: string){
    if (this.sort.key === key) {
      this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc';
    } else {
      this.sort.key = key;
      this.sort.order = 'asc';
    }

    this.page = 0;

    const pageSizeString = this.pageSize.toString();

    // Filter by namaKustomer
    let filterBy = '';
    let value = '';
    if (this.search.trim() !== '') {
      filterBy = 'namaKustomer';
      value = this.search.trim();
    }

    this.strukService.getStruk(this.page, this.sort.order, this.sort.key, filterBy, value, pageSizeString).subscribe((response: IResponse) => {
      if(response.success){
        this.struks = response.data.content;
        this.struks.forEach(struk => {
          struk.transaksis = struk.transaksi;
        });
        this.totalPages = response.data.totalPages;

        console.log(this.transaksis)
      }else{

      }
    }, (error) => {
      this.fetchError = true;
    });
  }

  goBack(){
    this.router.navigate(['/main']);
  }

  getPage(page: number) {
    this.page = page;

    const pageSizeString = this.pageSize.toString();
    this.strukService.getStruk(this.page, this.sort.order, this.sort.key, '', '', pageSizeString)
      .subscribe((response: IResponse) => {
        if (response.success) {
          this.struks = response.data.content;
          this.transaksis = response.data.content.transaksi;
          this.totalPages = response.data.totalPages;
        } else {
        }
      }, (error) => {
        this.fetchError = true;
      });
  }




  onSignOut(){

    Swal.fire({
      title: "Apakah kamu ingin keluar?",
      showDenyButton: true,
      confirmButtonText: "Signout"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Success Logout!",
        });
         this.userService.signOut();

      } else if (result.isDenied) {

      }
    });

  }

  openTransaksi(transaksiModal: TemplateRef<any>) {
    this.modalService.open(transaksiModal, { ariaLabelledBy: 'modal-basic-title' });
  }

  markAsPaid(id:number,nama:string){
    Swal.fire({
      title: 'Apakah transaksi Kustomer ' + nama +  ' sudah dibayar?',
      text:'Transaksi yang sudah dibayar tidak bisa diubah',
      showDenyButton: true,
      confirmButtonText: `Sudah Dibayar`
    }).then((result) => {
      if(result.isConfirmed){
        this.strukService.updatePaid(id).subscribe((response: IResponse) => {
          if(response.success){
            this.sortData(this.sort.key);
          }else{

          }
        })
      }else if(result.isDenied){

      }
    })
  }

  printPDF(strukId: number, noTabel: number,namaKustomer:string, transaksis: ITransaksi[], totalBayar: number, pajak: number, totalBayarAkhir: number) {
    const doc = new jsPDF();

    doc.setFont("helvetica", "normal");


    //Title
    doc.setFontSize(20);
    doc.text("RestAu", 95, 10);

    //SubTitle
    doc.setFontSize(14);
    doc.text("Wisma BCA Pondok Indah",75,20);
    doc.text("Jakarta Selatan",88,30);
    doc.text("@ 2024 RestAu",88,40);

    doc.setFontSize(13);
    doc.text("##########################################################################################", 0, 50);

    // Data struk
    doc.setFontSize(16);
    doc.text("DATA STRUK", 15, 60);
    doc.setFontSize(13);
    doc.text(`Struk ID: ${strukId}`, 15, 70);
    doc.text(`No Tabel: ${noTabel}`, 15, 80);
    doc.text(`Nama Kustomer: ${namaKustomer}`, 15, 90);

    // Add transaksi data
    const columns = ['Nama Menu', 'Jumlah Menu','Harga Menu','Total Harga'];
    const rows = transaksis.map((transaksi: ITransaksi) => [transaksi.namaMenu, transaksi.jumlahMenu, transaksi.hargaMenu, transaksi.totalHarga.toFixed(2)]);

    let finalY: number = 95;

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: finalY,
      styles: { cellPadding: 2, fontSize: 14 },
      columnStyles: {
          0: { cellWidth: 60 },
          1: { cellWidth: 40, halign: 'center' },
          2: { cellWidth: 40, halign: 'center' },
          3: { cellWidth: 40, halign: 'center' }
      },
      theme: 'grid',
      didDrawPage: (data) => {
        if (data.cursor) {
          finalY = data.cursor.y;
        }
      }
    });

    doc.setFontSize(13);
    doc.text("##########################################################################################", 0, finalY + 10);

    doc.setFontSize(13);
    doc.text(`Subtotal: Rp.${totalBayar.toFixed(2)}`, 15, finalY + 25);
    doc.text(`Pb 1 10%: Rp.${pajak.toFixed(2)}`, 15, finalY + 35);
    doc.text(`Total Bayar: Rp.${totalBayarAkhir.toFixed(2)}`, 15, finalY + 45);

    doc.setFontSize(18);
    doc.text("T H A N K   Y O U",65,finalY + 65);
    doc.text("F O R   Y O U R   V I S I T",60,finalY + 75);


    doc.save('struk.pdf');
  }

}
