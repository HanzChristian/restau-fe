import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { IMenu } from '../interfaces/i-menu';
import { Observable } from 'rxjs';
import { IResponse } from '../interfaces/i-response';
import { IMenuAvail } from '../interfaces/i-menu-avail';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  baseUrl: string = environment.baseUrl;

  constructor(private http:HttpClient,private router: Router) { }


  save(menu: IMenu):Observable<IResponse>{
    // const menuDTO = {
    //   namaMenu: menu.namaMenu,
    //   hargaMenu: menu.hargaMenu,
    //   jenisMenu: Number(menu.jenisMenu)
    // };

    const formData = new FormData();
    var url = `${this.baseUrl}/api/menu/v1/create`;

    if (menu.file) {
      formData.append('file', menu.file);
    }

    if(menu.namaMenu && menu.hargaMenu && menu.jenisMenu && menu.deskripsiMenu){
      url += `?namaMenu=${menu.namaMenu}&jenisMenu=${menu.jenisMenu}&hargaMenu=${menu.hargaMenu}&deskripsiMenu=${menu.deskripsiMenu}`;
    }

    return this.http.post<IResponse>(url, formData);
  }

  getMenu(page:number,sort:string,sortBy:string,filterBy:string,value:string,size:string,id:number):Observable<IResponse>{
    const headers = {
      'Content-Type': 'application/json'
    };

    let params = new HttpParams()
    .set('filterBy',filterBy)
    .set('value',value)
    .set('size',size);

    return this.http.get<IResponse>(`${this.baseUrl}/api/menu/v1/get-menu/${page}/${sort}/${sortBy}/${id}`, { headers, params });
  }

  getMenuById(id:number):Observable<IResponse>{
    const headers = {
      'Content-Type': 'application/json'
    };

    return this.http.get<IResponse>(`${this.baseUrl}/api/menu/v1/get-menu/${id}`, { headers });
  }


  editAvailMenu(id:number,available:IMenuAvail):Observable<IResponse>{
    const headers = {
      'Content-Type': 'application/json'
    };

    return this.http.put<IResponse>(`${this.baseUrl}/api/menu/v1/edit-avail/${id}`,available, { headers });
  }

  editMenu(id:number,menu:IMenu):Observable<IResponse>{
    const formData = new FormData();
    var url = `${this.baseUrl}/api/menu/v1/edit/${id}`;

    if(menu.file){
      formData.append('file',menu.file);
    }

    let params = new URLSearchParams();
    if (menu.namaMenu) {
      params.append('namaMenu', menu.namaMenu);
    }
    if (menu.jenisMenu) {
      params.append('jenisMenu', menu.jenisMenu.toString());
    }
    if (menu.hargaMenu) {
      params.append('hargaMenu', menu.hargaMenu.toString());
    }

    if (menu.deskripsiMenu) {
      params.append('deskripsiMenu', menu.deskripsiMenu);
    }

    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    return this.http.put<IResponse>(url, formData);
  }

  deleteMenu(id:number):Observable<IResponse>{
    const headers = {
      'Content-Type': 'application/json'
    };

    return this.http.delete<IResponse>(`${this.baseUrl}/api/menu/v1/delete/${id}`, { headers });
  }
  


}
