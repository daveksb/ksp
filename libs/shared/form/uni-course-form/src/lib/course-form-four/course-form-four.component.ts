import { Component, Input, OnInit } from '@angular/core';
import { DynamicComponent } from '@ksp/shared/interface';

@Component({
  selector: 'ksp-course-form-four',
  templateUrl: './course-form-four.component.html',
  styleUrls: ['./course-form-four.component.scss'],
})
export class CourseFormFourComponent implements DynamicComponent {
  @Input() data: any;
}
