import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public form!: FormGroup;
  public loginSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,private loginService:LoginService,
    public router: Router
  ) {
    this.initFormBuilder();
  }

  public initFormBuilder() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  public loginUser(){
    this.loginSubscription = this.loginService
    .loginWithUserCredentials(this.form.value.email, this.form.value.password).subscribe(
      data => { 
        if(this.loginService.isAdmin())
        this.router.navigateByUrl('/student-details');
      else{
        this.router.navigateByUrl('/exam-details');
      }
      }
    );
  }
}
