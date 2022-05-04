import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUserEducationComponent } from './form-user-education.component';

describe('FormUserEducationComponent', () => {
  let component: FormUserEducationComponent;
  let fixture: ComponentFixture<FormUserEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormUserEducationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUserEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
