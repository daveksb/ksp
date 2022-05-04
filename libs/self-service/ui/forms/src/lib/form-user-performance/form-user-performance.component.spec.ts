import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUserPerformanceComponent } from './form-user-performance.component';

describe('FormUserPerformanceComponent', () => {
  let component: FormUserPerformanceComponent;
  let fixture: ComponentFixture<FormUserPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormUserPerformanceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUserPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
