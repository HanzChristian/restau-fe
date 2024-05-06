import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IResponse } from 'src/app/interfaces/i-response';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-order',
  templateUrl: './dashboard-order.component.html',
  styleUrls: ['./dashboard-order.component.css']
})
export class DashboardOrderComponent implements OnInit{
  orders: any[] = [];
  fetchError = false
  search = '';
  pageSize = 10;
  page = 0;
  totalPages = 0;
  sort = {
    key:'id',
    order:'desc'
  };

  constructor(private orderService: OrderService,private router:Router,private userService: UserService){}

  ngOnInit(){
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

    // Filter by namaKustomer
    let filterBy = '';
    let value = '';
    if (this.search.trim() !== '') {
      filterBy = 'namaKustomer';
      value = this.search.trim();
    }

    this.orderService.getOrder(this.page, this.sort.order, this.sort.key, filterBy, value, pageSizeString)
      .subscribe((response: IResponse) => {
        if (response.success) {
          this.orders = response.data.content;
          this.totalPages = response.data.totalPages;
        } else {
          // Handle error response
        }
      }, (error) => {
        // Handle HTTP error
        this.fetchError = true;
      });
  }

  sortDataNew(key: string) {

    this.sort.key = key;
    this.sort.order = 'desc';

    this.page = 0;

    const pageSizeString = this.pageSize.toString();

    // Filter by namaKustomer
    let filterBy = '';
    let value = '';
    if (this.search.trim() !== '') {
      filterBy = 'namaKustomer';
      value = this.search.trim();
    }

    this.orderService.getOrder(this.page, this.sort.order, this.sort.key, filterBy, value, pageSizeString)
      .subscribe((response: IResponse) => {
        if (response.success) {
          this.orders = response.data.content;
          this.totalPages = response.data.totalPages;
        } else {
          // Handle error response
        }
      }, (error) => {
        // Handle HTTP error
        this.fetchError = true;
      });
  }

  markAsCooked(id: number,nama:string) {

    //Get Kasir/Manager id first
    this.userService.getUser().subscribe((response:IResponse) => {
      if(response.success){
        const idUser = response.data.id;
        Swal.fire({
          title:'Apakah orderan sudah dimasak?',
          text:'Transaksi yang sudah dimasak akan masuk ke total pembayaran kustomer ' + nama,
          showDenyButton:true,
          confirmButtonText:`Sudah dimasak`,
          denyButtonText:`Batal dimasak`
        }).then((result) => {
          if (result.isConfirmed){
            this.orderService.updateCoocked(id,idUser).subscribe((response: IResponse) => {
              if(response.success){
                this.sortDataNew(this.sort.key);
              }else{

              }
            })

          }else if(result.isDenied){
            this.orderService.batal(id,idUser).
            subscribe((response: IResponse) => {
              if(response.success){
                this.sortDataNew(this.sort.key);
              }else{

              }
            })
          }
        })
      }
    })
  }


  getPage(page: number) {
    this.page = page;

    const pageSizeString = this.pageSize.toString();
    this.orderService.getOrder(this.page, this.sort.order, this.sort.key, '', '', pageSizeString)
      .subscribe((response: IResponse) => {
        if (response.success) {
          this.orders = response.data.content;
          this.totalPages = response.data.totalPages;
          console.log(response.data.totalPages);
        } else {
        }
      }, (error) => {
        this.fetchError = true;
      });
  }



  goBack(){
    this.router.navigate(['/main']);
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

}
