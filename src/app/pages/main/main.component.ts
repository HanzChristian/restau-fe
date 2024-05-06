import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor(private userService: UserService, private router: Router){}

  onSignOut(){

    Swal.fire({
      title: "Apakah kamu ingin keluar?",
      showDenyButton: true,
      confirmButtonText: "Signout"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Success Logout!",
        });
         this.userService.signOut();

      } else if (result.isDenied) {

      }
    });

  }

}
