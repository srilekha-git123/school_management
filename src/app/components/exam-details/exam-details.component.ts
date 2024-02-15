import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { AddExamDetailsComponent } from '../add-exam-details/add-exam-details.component';
import { ExamResultDetails } from 'src/app/constants/interface';
import { MatTableDataSource } from '@angular/material/table';
import { TeacherService } from 'src/app/services/teacher.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-exam-details',
  templateUrl: './exam-details.component.html',
  styleUrls: ['./exam-details.component.css']
})
export class ExamDetailsComponent {

  displayedColumns = ['rollNo', 'name', 'class', 'maths', 'tamil', 'english', 'science', 'social', 'total', 'update', 'delete'];
  dataSource = new MatTableDataSource<ExamResultDetails>();
  public examResultDetails: ExamResultDetails[] = [];
  public isstudentLoggedIn:boolean = false;

  private destroyRef = inject(DestroyRef);

  constructor(private dialog: MatDialog, private teacherService: TeacherService,private loginService:LoginService) {
  }

  ngOnInit(): void {
    let scope =  sessionStorage.getItem('scope'); 
    if(scope === "student" || scope === "ROLE_ADMIN,ROLE_USER"){
      this.isstudentLoggedIn = true;
    }
    this.getAllExamDetails();
  }

  getAllExamDetails() {
    this.teacherService.getExamDetailsApi().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(values => {
      if (values) {
        this.examResultDetails = values;
        this.dataSource.data = this.examResultDetails;
      }
    })
  }

  addExamDetails() {
    const dialogRef = this.dialog.open(AddExamDetailsComponent, {
      disableClose: true,
      width: '800px',
      data: {
        mode: 'add'
      }
    });
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      if (data) {
      this.getAllExamDetails();
      }
    });
  }

  updateStudentDetail(row: any) {
    const dialogRef = this.dialog.open(AddExamDetailsComponent, {
      disableClose: true,
      width: '800px',
      data: {
        rowdata: row,
        mode: 'edit'
      }
    });
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      if (data) {
        this.getAllExamDetails();
      }
    });
  }

  deleteStudentDetail(id: number) {
    this.teacherService.deleteExamDetailsApi(id).subscribe(res => {
      //if(res){
      this.getAllExamDetails();
      //}
    });
  }

}
