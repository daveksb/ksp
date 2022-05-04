import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUserAddressComponent } from './form-user-address.component';

describe('FormUserAddressComponent', () => {
  let component: FormUserAddressComponent;
  let fixture: ComponentFixture<FormUserAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormUserAddressComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUserAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
