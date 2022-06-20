import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-course-form-one',
  templateUrl: './course-form-one.component.html',
  styleUrls: ['./course-form-one.component.scss'],
})
export class CourseFormOneComponent {
  @Input() data: any;
}
