import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { IResponse } from '../interfaces/i-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl: string = environment.baseUrl;

  constructor(private http:HttpClient,private router: Router){ }

  getOrder(page:number,sort:string,sortBy:string,filterBy:string,value:string,size:string):Observable<IResponse>{
    const headers = {
      'Content-Type': 'application/json'
    };

    let params = new HttpParams()
    .set('filterBy',filterBy)
    .set('value',value)
    .set('size',size);

    return this.http.get<IResponse>(`${this.baseUrl}/api/list-transaksi/v1/get-transaksi/${page}/${sort}/${sortBy}`, { headers, params });
  }

  updateCoocked(id:number,idUser:number):Observable<IResponse>{
    const headers = {
      'Content-Type': 'application/json'
    };

    return this.http.put<IResponse>(`${this.baseUrl}/api/list-transaksi/v1/cooked/${id}/${idUser}`, null, { headers });
  }

  batal(id:number,idUser:number)
  :Observable<IResponse>{
    const headers = {
      'Content-Type': 'application/json'
    };

    return this.http.put<IResponse>(`${this.baseUrl}/api/list-transaksi/v1/batal/${id}/${idUser}`, null, { headers });
    }
  }



