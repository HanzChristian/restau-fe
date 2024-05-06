import { Component } from '@angular/core';
import { IRegister } from 'src/app/interfaces/i-register';
import { IError } from 'src/app/interfaces/i-error';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
  user:IRegister;
  error: IError;

  constructor(private userService: UserService, private router: Router){
    this.user = {
      namaDepan: "",
      namaBelakang: "",
      email: "",
      akses: 0,
      pass: "",
    }

    this.error = {
      detail: ""
    }
  }

  onRegister(){
    if(this.user){
      this.userService.register(this.user)
      .subscribe((response) => {
        localStorage.setItem('authToken', `${response.data.token}`);
        this.router.navigate(['/token']);
        Swal.fire({
          icon: "success",
          title: "Register Success!",
          text: response.message,
        });
      }, (error) => {
        let errorMessage = error.error.error;
        console.log(errorMessage);
        if (errorMessage === "Request failed with status code 406") {
          errorMessage = "Email sudah terdaftar!";
        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage,
        })
      })
    }
  }

isValidEmail(email: String): boolean {
  const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  return emailPattern.test(email.valueOf());
}

isValidPassword(password: String): boolean {
  const passwordPattern = /(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]{6,}.*/;
  return passwordPattern.test(password.valueOf());
}

}

