// import { Injectable } from '@angular/core';
// import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 import { LoginService } from '../services/login.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(
//     private auth: LoginService,
//     private router: Router
//   ) { }

//   public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     if (this.auth.isLogged()) {
//       // logged in so return true
//       return true;
//     }
//     // not logged in so redirect to login page with the return url
//     this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
//     return false;
//   }
// }

import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';


export const adminGuard: CanActivateFn = (route, state) => {
  return inject(LoginService).isAdmin();
};

