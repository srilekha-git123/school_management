import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from  '@angular/material/table'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
//components
import { StudentDetailsComponent } from 'src/app/components/student-details/student-details.component';
import { AddStudentDetailsComponent } from 'src/app/components/add-student-details/add-student-details.component';
import { ExamDetailsComponent } from './components/exam-details/exam-details.component';
import { AddExamDetailsComponent } from './components/add-exam-details/add-exam-details.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';

import { AppInterceptor } from './http/http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    StudentDetailsComponent,
    AddStudentDetailsComponent,
    ExamDetailsComponent,
    AddExamDetailsComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
    MatAutocompleteModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
