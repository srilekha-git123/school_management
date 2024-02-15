import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-add-student-details',
  templateUrl: './add-student-details.component.html',
  styleUrls: ['./add-student-details.component.css']
})
export class AddStudentDetailsComponent {
  public Id: number = 0;

  addStudentform: FormGroup<any> = new FormGroup({
    rollNo: new FormControl(''),
    name: new FormControl(''),
    class: new FormControl(''),
    gender: new FormControl(''),
    mobile: new FormControl(''),
    address: new FormControl(''),
  });


  constructor(private formBuilder: FormBuilder, private studentService: StudentService,
    private dialogRef: MatDialogRef<AddStudentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
    this.addFormGroup();
    if (this.data && this.data.rowdata && this.data.mode === 'edit') {
      this.getAllData(this.data.rowdata);
    }
  }

  private addFormGroup() {
    this.addStudentform = this.formBuilder.group({
      rollno: ['', Validators.required],
      name: ['', Validators.required],
      class: ['', Validators.required],
      gender: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      emailid: ['', [Validators.required, Validators.email]]
    });
  }

  public get formControlValues(): { [key: string]: AbstractControl } {
    return this.addStudentform.controls;
  }

  private getAllData(rowData: any) {
    this.Id = rowData.id;
    this.formControlValues['rollno'].setValue(rowData.rollno);
    this.formControlValues['name'].setValue(rowData.name);
    this.formControlValues['class'].setValue(rowData.className);
    this.formControlValues['gender'].setValue(rowData.gender);
    this.formControlValues['mobile'].setValue(rowData.mobileno);
    this.formControlValues['address'].setValue(rowData.address);
    this.formControlValues['emailid'].setValue(rowData.emailid);
  }

  formSubmit() {
    if (this.addStudentform.invalid) {
      return;
    }
    else {
      let postApplicationForm = {
        rollno: this.addStudentform.value.rollno,
        name: this.addStudentform.value.name,
        className: this.addStudentform.value.class,
        gender: this.addStudentform.value.gender,
        mobileno: this.addStudentform.value.mobile,
        address: this.addStudentform.value.address,
        emailid: this.addStudentform.value.emailid,
      }
      if (this.Id <= 0) {
        this.studentService.postStudentDetailsApi(postApplicationForm).pipe().subscribe(
          data => {
            this.closePopup();
          }
        );
      }
      else {
        this.studentService.updateStudentDetailApi(this.Id, postApplicationForm).pipe().subscribe(
          data => {
            this.closePopup();
          }
        );
      }
    }
  }

  private closePopup() {
    this.dialogRef.close('form saved');
  }
}
