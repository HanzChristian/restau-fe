import { Component, OnInit } from '@angular/core';
import { IResponse } from 'src/app/interfaces/i-response';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-data-kasir',
  templateUrl: './data-kasir.component.html',
  styleUrls: ['./data-kasir.component.css']
})
export class DataKasirComponent implements OnInit{
  users: any[] = [];
  search = '';
  pageSize = 5;
  page = 0;
  totalPages = 0;
  sort = {
    key: 'id',
    order: 'desc'
  };

  constructor(private userService: UserService) { }

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

    const pageSizeString = this.pageSize.toString();

    // Filter by namaDepan
    let filterBy = '';
    let value = '';
    if (this.search.trim() !== '') {
      filterBy = 'namaDepan';
      value = this.search.trim();
    }

    this.userService.getUserKasir(this.page, this.sort.order, this.sort.key, filterBy, value, pageSizeString)
      .subscribe((response: IResponse) => {
        if (response.success) {
          this.users = response.data.content;
          this.totalPages = response.data.totalPages;
        } else {
          // Handle error response
        }
      }, (error) => {
        // Handle HTTP error
      });
  }


  getPage(page: number) {
    this.page = page;

    const pageSizeString = this.pageSize.toString();
    this.userService.getUserKasir(this.page, this.sort.order, this.sort.key, '', '', pageSizeString)
      .subscribe((response: IResponse) => {
        if (response.success) {
          this.users = response.data.content;
          this.totalPages = response.data.totalPages;
        } else {
        }
      }, (error) => {
      });
  }

  deleteKasir(id: number, namaDepan: string,namaBelakang: string){

    Swal.fire({
      title: 'Apakah kamu ingin hapus ' + namaDepan + ' ' + namaBelakang + '?',
      text: 'Data yang sudah dihapus tidak bisa dikembalikan',
      showDenyButton: true,
      confirmButtonText: `Hapus`
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe((response: IResponse) => {
          if (response.success) {
            Swal.fire({
              icon: 'success',
              title: 'Success Delete',
              text: 'Data berhasil dihapus'
            });
            this.sortData(this.sort.key);
          }
        }, (error) => {
        });
      }else if(result.isDenied){

      }
    })

  }
}
