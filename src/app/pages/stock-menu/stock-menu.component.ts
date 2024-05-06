import { Component, TemplateRef, inject } from '@angular/core';
import { Route, Router, NavigationEnd } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { ModalDismissReasons,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IJenismenu } from 'src/app/interfaces/i-jenismenu';
import { IError } from 'src/app/interfaces/i-error';
import { JenismenuService } from 'src/app/services/jenismenu.service';
import { IJenismenuResponse } from 'src/app/interfaces/i-jenismenu-response';
import { IResponseArray } from 'src/app/interfaces/i-response-array';
import { MenuService } from 'src/app/services/menu.service';
import { IMenu } from 'src/app/interfaces/i-menu';
import { TabelService } from 'src/app/services/tabel.service';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-stock-menu',
  templateUrl: './stock-menu.component.html',
  styleUrls: ['./stock-menu.component.css']
})
export class StockMenuComponent {

  jenisMenu: IJenismenu;
  jenisMenuResponse: IJenismenuResponse[] = [];
  menu: IMenu;
  error: IError;


  constructor(private userService: UserService, private router: Router,private jenisMenuService: JenismenuService,private menuService: MenuService,private tabelService: TabelService,private scrollService: ScrollService){
    this.jenisMenu = {
      namaJenis: ""
    }
    this.menu = {
      namaMenu: "",
      deskripsiMenu: "",
      hargaMenu: 0,
      jenisMenu: 0,
    }
    this.error = {
      detail: ""
    }
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

  goBack(){
    this.router.navigate(['/main']);
  }

  private modalService = inject(NgbModal);
	closeResult = '';

  openJenisMenu(jenisMenuModal: TemplateRef<any>) {
    this.modalService.open(jenisMenuModal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.jenisMenu.namaJenis = '';
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openMenu(menuModal: TemplateRef<any>){

    this.jenisMenuService.getAllJenisMenu().subscribe((response: IResponseArray) => {
      this.jenisMenuResponse = response.data;
    });

    this.modalService.open(menuModal, { ariaLabelledBy:'modal-basic-title-menu'
    }).result.then((result) => {
      this.menu.namaMenu = '';
      this.menu.hargaMenu = 0;
      this.menu.jenisMenu = 0;
      this.menu.deskripsiMenu = '';
      this.closeResult = `Closed with: ${result}`;
    },(reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openTabel(tabelModal: TemplateRef<any>){
    this.modalService.open(tabelModal, { ariaLabelledBy:'modal-basic-title-tabel'
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    },(reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      this.menu.file = file;
    }
  }



  private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}

  saveJenisModel(){
    this.jenisMenuService.save(this.jenisMenu).subscribe((response) => {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Berhasil menambahkan jenis menu"
      });
      this.jenisMenu.namaJenis = '';
      this.modalService.dismissAll();
      //add router to present data jenis menu
      this.router.navigate(['/stock-menu/jenis-menu']);

    }, (error) => {
      let errorMessage = error.error.error;
      console.log(errorMessage);
      if (errorMessage === "Request failed with status code 400") {
        errorMessage = "Nama jenis menu masih kosong!";
      }
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
      })
    });
  }

  saveMenu(){
    this.menuService.save(this.menu).subscribe((response) => {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Berhasil menambahkan menu"
      });
      this.menu.namaMenu = '';
      this.menu.hargaMenu = 0;
      this.menu.jenisMenu = 0;
      this.menu.deskripsiMenu = '';
      this.modalService.dismissAll();
      this.router.navigate(['/stock-menu/jenis-menu']);
    }, (error) => {
      let errorMessage = error.error.error;
      console.log(errorMessage);
      if (errorMessage === "Request failed with status code 400") {
        errorMessage = "Input Menu masih kosong!";
      }
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
      })
    })
  }

  saveTabel(){
    this.tabelService.save().subscribe
    ((response) => {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Berhasil menambahkan meja baru"
      });
      this.modalService.dismissAll();
      this.router.navigate(['/stock-menu/data-tabel']);
    }, (error) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.error.message
      });
    });
  }

  scrollToId(id: string) {
    console.log("element id : ", id);
    this.scrollService.scrollToElementById(id);
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects.includes('/stock-menu/jenis-menu')) {
        this.scrollToId('jenis-menu');
      }
      if(event instanceof NavigationEnd && event.urlAfterRedirects.includes('/stock-menu/data-kasir')){
        this.scrollToId('data-kasir');
      }
    });
  }



}
