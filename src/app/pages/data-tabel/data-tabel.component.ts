import { Component, OnInit } from '@angular/core';
import { IResponse } from 'src/app/interfaces/i-response';
import { TabelService } from 'src/app/services/tabel.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-data-tabel',
  templateUrl: './data-tabel.component.html',
  styleUrls: ['./data-tabel.component.css']
})
export class DataTabelComponent implements OnInit{
  tabels: any[] = [];
  search = '';
  pageSize = 5;
  page = 0;
  totalPages = 0;
  sort = {
    key: 'id',
    order: 'desc'
  }

  constructor(private tabelService: TabelService){}

  ngOnInit() {
    this.sortData(this.sort.key);
  }

  sortData(key: string) {

    if (this.sort.key === key) {
      this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc';
    } else {
      this.sort.key = key;
      this.sort.order = 'asc';
    }

    this.page = 0;
    let filterBy = '';
    let value = '';
    if (this.search.trim() !== '') {
      filterBy = 'id';
      value = this.search.trim();
    }

    const pageSizeString = this.pageSize.toString();


    this.tabelService.getTabel(this.page, this.sort.order, this.sort.key, filterBy, value, pageSizeString)
      .subscribe((response: IResponse) => {
        if (response.success) {
          this.tabels = response.data.content;
          this.totalPages = response.data.totalPages;
        } else {

        }
      }, (error) => {

      });
  }

  getPage(page: number) {
    this.page = page;

    const pageSizeString = this.pageSize.toString();
    this.tabelService.getTabel(this.page, this.sort.order, this.sort.key, '', '', pageSizeString)
      .subscribe((response: IResponse) => {
        if (response.success) {
          this.tabels = response.data.content;
          this.totalPages = response.data.totalPages;
        } else {
        }
      }, (error) => {
      });
  }

  deleteTabel(id: number){
    Swal.fire({
      title: 'Apakah kamu ingin hapus Tabel' + id + ' ' + '?',
      text: 'Data yang sudah dihapus tidak bisa dikembalikan',
      showDenyButton: true,
      confirmButtonText: `Hapus`
    }).then((result) => {
      if (result.isConfirmed) {
        this.tabelService.deleteTabel(id).subscribe((response: IResponse) => {
          if (response.success) {
            Swal.fire({
              icon: 'success',
              title: 'Success Delete',
              text: 'Data berhasil dihapus'
            });
            this.sortData(this.sort.key);
          }
        }, (error) => {
          let errorMessage = error.error.error;
          console.log(errorMessage);
          if (errorMessage === "Request failed with status code 406") {
            errorMessage = "Email sudah terdaftar!";
          }
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errorMessage,
          })

        });
      }else if(result.isDenied){

      }
    })
  }




}
