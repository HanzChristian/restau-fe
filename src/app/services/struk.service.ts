import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IResponse } from '../interfaces/i-response';

@Injectable({
  providedIn: 'root'
})
export class StrukService {

  baseUrl: string = environment.baseUrl;

  constructor(private http:HttpClient,private router:Router) { }

  getStruk(page:number,sort:string,sortBy:string,filterBy:string,value:string,size:string):Observable<IResponse>{
    const headers = {
      'Content-Type': 'application/json'
    };

    let params = new HttpParams()
    .set('filterBy',filterBy)
    .set('value',value)
    .set('size',size);

    return this.http.get<IResponse>(`${this.baseUrl}/api/list-struk/v1/get-struk/${page}/${sort}/${sortBy}`, { headers, params });
  }

  updatePaid(id:number):Observable<IResponse>{
    const headers = {
      'Content-Type': 'application/json'
    };

    return this.http.put<IResponse>(`${this.baseUrl}/api/list-struk/v1/paid/${id}`, null, { headers });
  }


}
