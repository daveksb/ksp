import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUserWorkplaceComponent } from './form-user-workplace.component';

describe('FormUserWorkplaceComponent', () => {
  let component: FormUserWorkplaceComponent;
  let fixture: ComponentFixture<FormUserWorkplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormUserWorkplaceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUserWorkplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
