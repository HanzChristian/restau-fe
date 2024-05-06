import { Injectable } from '@angular/core';
import { ISignin, IToken } from '../interfaces/i-signin';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { IRegister } from '../interfaces/i-register';
import { IDataResponse } from '../interfaces/i-data-response';
import { ITokenResponse } from '../interfaces/i-token-response';
import { IUserResponse } from '../interfaces/i-user-response';
import { IMenuModel } from '../interfaces/i-menu-model';
import { IUser } from '../interfaces/i-user';
import { IResponse } from '../interfaces/i-response';
import { IResponseArray } from '../interfaces/i-response-array';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  isLoggedIn: boolean = false;
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient,private router: Router) { }

  signIn(user: ISignin):Observable<IDataResponse>{
    const headers = {
      'Content-Type': 'application/json',
    };

    return this.http.post<IDataResponse>(`${this.baseUrl}/api/users/v1/login`, user, { headers });
  }

  register(user: IRegister):Observable<IDataResponse>{
    const headers = {
      'Content-Type': 'application/json'
    };

    return this.http.post<IDataResponse>(`${this.baseUrl}/api/users/v1/regis`, user, { headers });
  }

  getUser():Observable<IResponse>{
    const rahasia = localStorage.getItem('rahasia');
    const headers ={
      'Content-Type': 'application/json'
    };

    return this.http.get<IResponse>(`${this.baseUrl}/api/users/v1/get-user/${rahasia}`, { headers });
  }


  getUserKasir(page:number, sort:string, sortBy:string,filterBy: string,value:string,size:string):Observable<IResponse>{
    const headers = {
      'Content-Type': 'application/json'
    };

    let params = new HttpParams()
      .set('filterBy',filterBy)
      .set('value',value)
      .set('size',size);


    return this.http.get<IResponse>(`${this.baseUrl}/api/users/v1/get-user/${page}/${sort}/${sortBy}`, { headers, params });
  }

  deleteUser(id: number):Observable<IResponse>{
    const headers = {
      'Content-Type': 'application/json'
    };

    return this.http.delete<IResponse>(`${this.baseUrl}/api/users/v1/delete/${id}`, { headers });
  }


  inputToken(token: IToken):Observable<ITokenResponse>{
    const bearerToken = localStorage.getItem('authToken');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`
    };

    return this.http.post<ITokenResponse>(`${this.baseUrl}/api/users/token`, token, { headers });
  }

  setAuthentication(token: IDataResponse){
    localStorage.setItem("token",token.data.token);
    localStorage.setItem("rahasia",token.data.rahasia.toString());
    this.isLoggedIn = true;
  }

  isAuthenticated(): boolean{
    if (localStorage.getItem("token")) {
      this.isLoggedIn = true;
      return this.isLoggedIn;
    }
    return false;
  }

  getToken(): string{
    return localStorage.getItem("token") || "";
  }


  signOut(): void{
    localStorage.removeItem("token");
    localStorage.removeItem("rahasia");
    this.router.navigate(['']);
  }



}
