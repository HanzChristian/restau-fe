import { inject } from "@angular/core";
import { UserService } from "../services/user.service"
import { Router } from "@angular/router";

export const AuthGuard = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isAuthenticated()) {
    return true;
  }

  router.navigate(['']);
  return false;
}

export const PreventGuard = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isAuthenticated()) {

  router.navigate(['main']);
    return false;
  }

  return true;
}


// import { Injectable, inject } from '@angular/core';
// import {
//     ActivatedRouteSnapshot,
//     CanActivate,
//     Router,
//     RouterStateSnapshot,
// } from '@angular/router';
// import { UserService } from '../services/user.service';
// import { tap } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {
//     constructor(private userService: UserService, private router: Router) {}

//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//         if (this.userService.isAuthenticated()) {
//             return true;
//         }

//         this.router.navigate(['login']);
//         return false;
//     }
// }


// @Injectable({ providedIn: 'root' })
// export class PreventGuard implements CanActivate {
//     constructor(private userService: UserService, private router: Router) {}

//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//         if (this.userService.isAuthenticated()) {
//             this.router.navigate(['main']);
//             return false;
//         }

//         return true;
//     }
// }
