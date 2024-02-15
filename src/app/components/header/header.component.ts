import { Component, inject } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public isstudentLoggedIn: boolean = false;
  constructor(private loginService: LoginService, private router: Router) {
  }

ngOnInit(){
  this.isstudentLoggedIn = this.loginService.isAdmin();
}
  onLogout() {
    this.loginService.logout().subscribe(
      data => {
        sessionStorage.clear();
        this.router.navigate(['/login']);
      }
    );
  }

}
