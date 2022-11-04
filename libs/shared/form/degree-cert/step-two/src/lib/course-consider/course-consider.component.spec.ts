import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseConsiderComponent } from './course-consider.component';

describe('CourseConsiderComponent', () => {
  let component: CourseConsiderComponent;
  let fixture: ComponentFixture<CourseConsiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseConsiderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseConsiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
