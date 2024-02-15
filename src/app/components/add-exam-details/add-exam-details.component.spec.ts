import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExamDetailsComponent } from './add-exam-details.component';

describe('AddExamDetailsComponent', () => {
  let component: AddExamDetailsComponent;
  let fixture: ComponentFixture<AddExamDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddExamDetailsComponent]
    });
    fixture = TestBed.createComponent(AddExamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
