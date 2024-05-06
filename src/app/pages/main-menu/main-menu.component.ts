import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { IUser } from 'src/app/interfaces/i-user';
import { IUserResponse } from 'src/app/interfaces/i-user-response';
import { ScrollService } from 'src/app/services/scroll.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})

export class MainMenuComponent {
  user: IUserResponse | undefined;

  constructor(private userService: UserService,private scrollService: ScrollService) {
    this.userService.getUser()
    .pipe(
      catchError((error: HttpErrorResponse) => {
          Swal.fire({
              title: 'Error!',
              text:
                  error.error.message === null
                      ? error.error.error
                      : error.error.message,
              icon: 'error',
          }).then(() => {
              if (
                  error.error.error ==
                  'Full authentication is required to access this resource'
              ) {
                  this.userService.signOut();
              }
          });
          return throwError(() => new Error('Someting wrong!'));
      })
  )

    .subscribe((response) => {
      this.user = {
        namaDepan: response.data.namaDepan,
        namaBelakang: response.data.namaBelakang,
        idAkses: response.data.idAkses,
        namaAkses: response.data.namaAkses
      }


    });
  }

  scrollToId(id: string) {
    console.log("element id : ", id);
    this.scrollService.scrollToElementById(id);
  }

  scrollToElement(element: HTMLElement) {
    this.scrollService.scrollToElement(element);
  }
}
