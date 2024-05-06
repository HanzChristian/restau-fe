import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IResponse } from 'src/app/interfaces/i-response';
import { IMenu } from 'src/app/interfaces/i-menu';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JenismenuService } from 'src/app/services/jenismenu.service';
import { IJenismenu } from 'src/app/interfaces/i-jenismenu';
import { IResponseArray } from 'src/app/interfaces/i-response-array';
import { IJenismenuResponse } from 'src/app/interfaces/i-jenismenu-response';
import { IError } from 'src/app/interfaces/i-error';
import { IMenuAvail } from 'src/app/interfaces/i-menu-avail';
import { IMenuId } from 'src/app/interfaces/i-menu-id';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-data-menu',
  templateUrl: './data-menu.component.html',
  styleUrls: ['./data-menu.component.css']
})
export class DataMenuComponent implements OnInit{
  menus: any[] = [];
  fetchError = false
  currentId: number;
  search = '';
  pageSize = 3;
  page = 0;
  totalPages = 0;
  sort = {
    key: 'id',
    order: 'desc'
  };
  idJenisMenu: string = "";
  jenisMenu: IJenismenu;
  jenisMenuResponse: IJenismenuResponse[] = [];
  menu: IMenuId;
  menuEdit: IMenu;
  error: IError;

  constructor(private menuService: MenuService,private jenisMenuService: JenismenuService,private route: ActivatedRoute,private router:Router){

    this.jenisMenu = {
      namaJenis: ""
    }

    this.menu = {
      namaMenu:"",
      hargaMenu: 0,
      deskripsiMenu: "",
      idJenisMenu: 0,
      namaJenis:""
    }

    this.menuEdit = {
      namaMenu:"",
      hargaMenu: 0,
      deskripsiMenu:"",
      jenisMenu:0,
    }

    this.error = {
      detail: ""
    }

    this.currentId = 0;
  }

  ngOnInit() {
    this.idJenisMenu = this.route.snapshot.paramMap.get('id') ?? '';
    this.sortData(this.sort.key);
  }

  sortData(key: string) {

    if (this.sort.key === key) {
      this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc';
      this.sort.key = key;
      this.sort.order = 'asc';
    }

    this.page = 0;

    const pageSizeString = this.pageSize.toString();

    // Filter by namaMenu
    let filterBy = '';
    let value = '';
    if (this.search.trim() !== '') {
      filterBy = 'namaMenu';
      value = this.search.trim();
    }

    this.menuService.getMenu(this.page, this.sort.order, this.sort.key, filterBy, value, pageSizeString,Number(this.idJenisMenu))
      .subscribe((response: IResponse) => {
        if (response.success) {
          this.menus = response.data.content;
          this.totalPages = response.data.totalPages;
        } else {
          // Handle error response
        }
      }, (error) => {
        // Handle HTTP error
        this.fetchError = true;
      });
  }


  getPage(page: number) {
    this.page = page;

    const pageSizeString = this.pageSize.toString();
    this.menuService.getMenu(this.page, this.sort.order, this.sort.key, '', '', pageSizeString,Number(this.idJenisMenu))
      .subscribe((response: IResponse) => {
        if (response.success) {
          this.menus = response.data.content;
          this.totalPages = response.data.totalPages;
        } else {
        }
      }, (error) => {
      });
  }

  updateAvailMenu(id: number, avail: IMenuAvail) {
    console.log('id:', id, 'avail:', avail);  // Add this line

    this.menuService.editAvailMenu(id, avail).subscribe((response: IResponse) => {
      if (response.success) {
        const menu = this.menus.find(menu => menu.id === id);
        if (menu) {
          menu.available = avail.available;
        }
      } else {
        // Handle unsuccessful response
      }
    }, (error) => {
      // Handle HTTP error
    });
  }

  private modalService = inject(NgbModal);
	closeResult = '';

  openMenu(id:number, menuModal: TemplateRef<any>) {

    this.currentId = id;

    // Get all jenis menu data
    this.jenisMenuService.getAllJenisMenu().subscribe((response: IResponseArray) => {
      this.jenisMenuResponse = response.data;
    });

    // Get data based on id
    this.menuService.getMenuById(id).subscribe((response: IResponse) => {
      this.menu = response.data;
      this.menuEdit = {
        ...this.menu,
        jenisMenu: this.menu.idJenisMenu
      };

      this.modalService.open(menuModal, {
        ariaLabelledBy: 'modal-basic-title-menu'
      }).result.then((result) => {
        this.menu.namaMenu = this.menu.namaMenu;
      });
    });
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

onFileSelected(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    this.menuEdit.file = file;
  }
}

updateMenu(){
  this.menuService.editMenu(this.currentId,this.menuEdit).subscribe
  ((response) => {
    Swal.fire({
      icon: "success",
      title:"Success!",
      text:"Berhasil mengupdate menu"
    });
    this.modalService.dismissAll();
    this.router.navigate([`/stock-menu/jenis-menu`]);

  },(error) => {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: error.error.message
    });
  })
}

deleteMenu(id:number){
  Swal.fire({
    title: 'Apakah anda ingin menghapus menu ini?',
    showCancelButton: true,
    confirmButtonText: `Ya`,
    cancelButtonText: `Tidak`
  }).then((result) => {
    if (result.isConfirmed) {
      this.menuService.deleteMenu(id).subscribe((response) => {
        Swal.fire('Berhasil!', 'Menu berhasil dihapus', 'success');
        this.router.navigate([`/stock-menu/jenis-menu`]);
      }, (error) => {
        Swal.fire('Gagal!', 'Menu gagal dihapus', 'error');
      });
    }
  }

  )

}

}
