import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-course-form-three',
  templateUrl: './course-form-three.component.html',
  styleUrls: ['./course-form-three.component.scss'],
})
export class CourseFormThreeComponent implements OnInit {
  @Input() data: any;

  ngOnInit(): void {}
}
