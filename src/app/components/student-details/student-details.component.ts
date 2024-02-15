import { Component, DestroyRef, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StudentDetails } from 'src/app/constants/interface';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AddStudentDetailsComponent } from '../add-student-details/add-student-details.component';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent {

  displayedColumns = ['rollNo', 'name', 'class', 'gender', 'mobile', 'emailid', 'address', 'update', 'delete'];
  dataSource = new MatTableDataSource<StudentDetails>();
  studentDetails: StudentDetails[] = [];
  public isteacherLoggedIn:boolean = false;

  private destroyRef = inject(DestroyRef);

  constructor(private dialog: MatDialog, private studentService: StudentService) { }

  ngOnInit(): void {
    let scope =  sessionStorage.getItem('scope'); 
    if(scope === "teacher"){
      this.isteacherLoggedIn = true;
    }
    this.getAllStudentDetails();
  }

  getAllStudentDetails() {
    this.studentService.getStudentDetailsApi().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(values => {
      if (values) {
        this.studentDetails = values;
        this.dataSource.data = this.studentDetails;
      }
    })
  }

  addStudentDetails() {
    const dialogRef = this.dialog.open(AddStudentDetailsComponent, {
      disableClose: true,
      width: '800px',
      data: {
        mode: 'add'
      }
    });
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      if (data) {
        this.getAllStudentDetails();
      }
    });
  }

  updateStudentDetail(row: any) {
    const dialogRef = this.dialog.open(AddStudentDetailsComponent, {
      disableClose: true,
      width: '800px',
      data: {
        rowdata: row,
        mode: 'edit'
      }
    });
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      if (data) {
        this.getAllStudentDetails();
      }
    });
  }

  deleteStudentDetail(id: number) {
    this.studentService.deleteStudentDetailsApi(id).subscribe(res => {
      //if(res){
      this.getAllStudentDetails();
      //}
    });
  }
}
