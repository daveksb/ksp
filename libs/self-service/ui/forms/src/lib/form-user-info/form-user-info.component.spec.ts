import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUserInfoComponent } from './form-user-info.component';

describe('FormUserInfoComponent', () => {
  let component: FormUserInfoComponent;
  let fixture: ComponentFixture<FormUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormUserInfoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
