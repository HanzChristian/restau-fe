import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IJenismenu } from 'src/app/interfaces/i-jenismenu';
import { IJenismenuResponse } from 'src/app/interfaces/i-jenismenu-response';
import { IResponse } from 'src/app/interfaces/i-response';
import { IResponseArray } from 'src/app/interfaces/i-response-array';
import { JenismenuService } from 'src/app/services/jenismenu.service';

@Component({
  selector: 'app-jenis-menu',
  templateUrl: './jenis-menu.component.html',
  styleUrls: ['./jenis-menu.component.css']
})
export class JenisMenuComponent implements OnInit {

  jeniss: any[] = [];
  fetchError = false;
  search = '';
  pageSize = 9;
  page = 0;
  totalPages = 0;
  sort = {
    key: 'id',
    order: 'desc'
  }

  constructor(private jenisMenuService: JenismenuService,private router: Router){}

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
      filterBy = 'namaJenis';
      value = this.search.trim();
    }

    const pageSizeString = this.pageSize.toString();


    this.jenisMenuService.getJenisMenu(this.page, this.sort.order, this.sort.key, filterBy, value, pageSizeString)
      .subscribe((response: IResponse) => {
        if (response.success) {
          this.jeniss = response.data.content;
          this.totalPages = response.data.totalPages;
        } else {

        }
      }, (error) => {
        this.fetchError = true;
      });
  }

  getPage(page: number) {
    this.page = page;

    const pageSizeString = this.pageSize.toString();
    this.jenisMenuService.getJenisMenu(this.page, this.sort.order, this.sort.key, '', '', pageSizeString)
      .subscribe((response: IResponse) => {
        if (response.success) {
          this.jeniss = response.data.content;
          this.totalPages = response.data.totalPages;
        } else {
        }
      }, (error) => {
      });
  }

  navigateToMenuDetail(id: number) {
    this.router.navigate(['/stock-menu/jenis-menu', id]);
  }

}
