import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-add-exam-details',
  templateUrl: './add-exam-details.component.html',
  styleUrls: ['./add-exam-details.component.css']
})
export class AddExamDetailsComponent {
  public Id: number = 0;

  addExamResultform: FormGroup<any> = new FormGroup({
    rollNo: new FormControl(''),
    name: new FormControl(''),
    className: new FormControl(''),
    tamil: new FormControl(''),
    english: new FormControl(''),
    maths: new FormControl(''),
    science: new FormControl(''),
    social: new FormControl(''),
    total: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder, private teacherService: TeacherService,
    private dialogRef: MatDialogRef<AddExamDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.addFormGroup();
    if (this.data && this.data.rowdata && this.data.mode === 'edit') {
      this.getAllData(this.data.rowdata);
    }
  }

  private addFormGroup() {
    this.addExamResultform = this.formBuilder.group({
      rollNo: ['', Validators.required],
      name: ['', Validators.required],
      className: ['', Validators.required],
      tamil: ['', Validators.required],
      english: ['', Validators.required],
      maths: ['', Validators.required],
      science: ['', Validators.required],
      social: ['', Validators.required]
    });
  }

  public get formControlValues(): { [key: string]: AbstractControl } {
    return this.addExamResultform.controls;
  }

  private getAllData(rowData: any) {
    this.Id = rowData.id;
    this.formControlValues['rollNo'].setValue(rowData.rollNo);
    this.formControlValues['name'].setValue(rowData.name);
    this.formControlValues['className'].setValue(rowData.className);
    this.formControlValues['tamil'].setValue(rowData.tamil);
    this.formControlValues['english'].setValue(rowData.english);
    this.formControlValues['maths'].setValue(rowData.maths);
    this.formControlValues['science'].setValue(rowData.science);
    this.formControlValues['social'].setValue(rowData.social);
  }

  formSubmit() {
    if (this.addExamResultform.invalid) {
      return;
    }
    else {
      let postApplicationForm = {
        rollNo: this.addExamResultform.value.rollNo,
        name: this.addExamResultform.value.name,
        className: this.addExamResultform.value.className,
        tamil: this.addExamResultform.value.tamil,
        english: this.addExamResultform.value.english,
        maths: this.addExamResultform.value.maths,
        science: this.addExamResultform.value.science,
        social: this.addExamResultform.value.social,
        total: (this.addExamResultform.value.tamil + this.addExamResultform.value.english + this.addExamResultform.value.maths +
          this.addExamResultform.value.science + this.addExamResultform.value.social)
      }
      if (this.Id <= 0) {
      this.teacherService.postExamDetailsApi(postApplicationForm).pipe().subscribe(
        data => {
          this.closePopup();
        }
      );
      }
      else{
        this.teacherService.updateExamDetailApi(this.Id, postApplicationForm).pipe().subscribe(
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
