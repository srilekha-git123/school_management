import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentDetailsComponent } from './add-student-details.component';

describe('AddStudentDetailsComponent', () => {
  let component: AddStudentDetailsComponent;
  let fixture: ComponentFixture<AddStudentDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddStudentDetailsComponent]
    });
    fixture = TestBed.createComponent(AddStudentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
