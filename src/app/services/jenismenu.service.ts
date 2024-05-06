import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IJenismenu } from '../interfaces/i-jenismenu';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { IResponse } from '../interfaces/i-response';
import { IResponseArray } from '../interfaces/i-response-array';

@Injectable({
  providedIn: 'root'
})
export class JenismenuService {

  baseUrl: string = environment.baseUrl;

  constructor(private http:HttpClient,private router: Router) { }

  save(jenisMenu: IJenismenu):Observable<IResponse>{
    const headers = {
      'Content-Type': 'application/json'
    };


    return this.http.post<IResponse>(`${this.baseUrl}/api/jenis-menu/v1/create`, jenisMenu, { headers });
  }


  getAllJenisMenu():Observable<IResponseArray>{
    const headers ={
      'Content-Type': 'application/json'
    };

    return this.http.get<IResponseArray>(`${this.baseUrl}/api/jenis-menu/v1/get-all`,{headers})
  }

  getJenisMenu(page:number, sort:string,sortBy:string,filterBy:string,value:string,size:string):Observable<IResponse>{
    const headers = {
      'Content-Type': 'application/json'
    };

    let params = new HttpParams()
    .set('filterBy',filterBy)
    .set('value',value)
    .set('size',size);

    return this.http.get<IResponse>(`${this.baseUrl}/api/jenis-menu/v1/get-jenis/${page}/${sort}/${sortBy}`, { headers, params });
  }


}
