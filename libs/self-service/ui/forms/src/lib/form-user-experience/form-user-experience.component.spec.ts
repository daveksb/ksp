import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUserExperienceComponent } from './form-user-experience.component';

describe('FormUserExperienceComponent', () => {
  let component: FormUserExperienceComponent;
  let fixture: ComponentFixture<FormUserExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormUserExperienceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUserExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
