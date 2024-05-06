import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IMenuModel } from 'src/app/interfaces/i-menu-model';
import { IUser } from 'src/app/interfaces/i-user';
import { IUserResponse } from 'src/app/interfaces/i-user-response';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent {
  user: IUserResponse | undefined
  cards:any = [];


  constructor(private userService: UserService, private router: Router) {
    this.userService.getUser().subscribe((response) => {
      this.user = {
        namaDepan: response.data.namaDepan,
        namaBelakang: response.data.namaBelakang,
        idAkses: response.data.idAkses,
        namaAkses: response.data.namaAkses
      }

      if (this.user.idAkses == 1) { // Manager
        this.cards = [
          {
            title: 'Menu Restoran',
            text: 'Lihat list menu makanan serta minuman, tambahkan serta edit data menu makanan dan minuman disini!',
            link:  'stock-menu',
            image: 'https://dretail.id/asset/img/article-img/article112712.jpg'
          },
          {
            title: 'Dashboard Order Restoran',
            text: 'Lihat order yang masuk, sedang diproses, dan sudah selesai disini!',
            link: 'dashboard-order',
            image: 'https://images.unsplash.com/photo-1586511925558-a4c6376fe65f'
          },
          {
            title: 'Print Struk Order',
            text: 'Selesaikan orderan kustomer dan print struk order disini!',
            link: 'struk',
            image: 'https://www.jurnal.id/wp-content/uploads/2021/11/aplikasi-cetak-struk.jpg'
          }
        ];
      } else if (this.user.idAkses == 2) { // Kasir
        this.cards = [
          {
            title: 'Dashboard Order Restoran',
            text: 'Lihat order yang masuk, sedang diproses, dan sudah selesai disini!',
            link: 'dashboard-order',
            image: 'https://images.unsplash.com/photo-1586511925558-a4c6376fe65f'
          },
          {
            title: 'Print Struk Order',
            text: 'Selesaikan orderan kustomer dan print struk order disini!',
            link: 'struk',
            image: 'https://www.jurnal.id/wp-content/uploads/2021/11/aplikasi-cetak-struk.jpg'
          }
        ];
      }
    });
  }

  displayCardFlex(){
    return this.user && this.user.idAkses == 1 ? '0 0 30%' : '0 0 45%';
  }



}
