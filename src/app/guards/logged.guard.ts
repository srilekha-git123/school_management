// import { Injectable } from '@angular/core';
// import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// import { AuthService } from '../services/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class Logged implements Resolve<any> {

//   constructor(
//     private authService: AuthService,
//     private router: Router
//   ) { }

//   public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     if (this.authService.isLogged()) {
//       this.router.navigateByUrl('/admin/application');
//     }
//   }
// }
