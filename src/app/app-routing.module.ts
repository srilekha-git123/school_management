import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDetailsComponent } from 'src/app/components/student-details/student-details.component';
import { ExamDetailsComponent } from './components/exam-details/exam-details.component';
import { LoginComponent } from './components/login/login.component';
import { adminGuard } from './guards/auth.guard';
//import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'student-details',component:StudentDetailsComponent,canActivate: [adminGuard]},
  {path:'exam-details',component:ExamDetailsComponent},
  {path:'login',component:LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
