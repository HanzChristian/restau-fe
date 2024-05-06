import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IResponse } from '../interfaces/i-response';

@Injectable({
  providedIn: 'root'
})
export class TabelService {

  baseUrl: string = environment.baseUrl;

  constructor(private http:HttpClient,private router: Router) { }

  save():Observable<IResponse>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<IResponse>(`${this.baseUrl}/api/avail-tabel/v1/create`,{}, { headers })
  }

  getTabel(page:number, sort:string, sortBy:string,filterBy:string, value:string,size:string):Observable<IResponse>{
    const headers = {
      'Content-Type': 'application/json'
    };

    let params = new HttpParams()
    .set('filterBy',filterBy)
    .set('value',value)
    .set('size',size);

    return this.http.get<IResponse>(`${this.baseUrl}/api/avail-tabel/v1/get-tabel/${page}/${sort}/${sortBy}`, { headers, params });
  }

  deleteTabel(id:number):Observable<IResponse>{
    const headers = {
      'Content-Type': 'application/json'
    };

    return this.http.delete<IResponse>(`${this.baseUrl}/api/avail-tabel/v1/delete/${id}`, { headers });
  }

}
