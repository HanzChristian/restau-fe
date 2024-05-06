import { Component } from '@angular/core';
import { IToken } from 'src/app/interfaces/i-token';
import { IError } from 'src/app/interfaces/i-error';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-input-token',
  templateUrl: './input-token.component.html',
  styleUrls: ['./input-token.component.css']
})
export class InputTokenComponent {
  user: IToken;
  error: IError;

  constructor(private userService: UserService, private router: Router){
    this.user = {
      token: ""
    }

    this.error = {
      detail : ""
    }
  }

  onToken(){
    if(this.user){
      this.userService.inputToken(this.user)
      .subscribe((response) => {
        localStorage.removeItem('authToken')
        this.router.navigate(['/login']);
        Swal.fire({
          icon: "success",
          title: "Token Success!",
          text: response.message,
        });
      }, (error) => {
        this.error.detail = error.error.detail;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Token tidak valid/sudah expired',
        })
      })
    }
  }
}
