import { Component } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ISignin, IToken } from 'src/app/interfaces/i-signin';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { IError } from 'src/app/interfaces/i-error';
import Swal from 'sweetalert2'
import { IDataResponse } from 'src/app/interfaces/i-data-response';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.css']
})
export class UserSigninComponent {
  // users: IUser[];
  user: ISignin;
  error: IError;

  constructor(private userService: UserService,private router: Router) {
    this.user = {
      email: "",
      pass: ""
    }
    this.error = {
      detail: ""
    }
  }

  onSignIn(){
    if(this.user){
      this.userService.signIn(this.user)
      .subscribe((response: IDataResponse) => {
        this.router.navigate(['/main']);
        // localStorage.setItem('loginToken', `${response.data.token}`);
        this.userService.setAuthentication(response);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Success Login!",
        });
      }, (error) => {
        let errorMessage = error.error.error;
        console.log(errorMessage);
        if (errorMessage === "Request failed with status code 400") {
          errorMessage = "Email/Password masih kosong!";
        }else if (errorMessage === "Request failed with status code 406"){
          errorMessage = "Email/Password salah!";
        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage,
        })
      })
    }
  }

}




