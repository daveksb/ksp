import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-course-form-two',
  templateUrl: './course-form-two.component.html',
  styleUrls: ['./course-form-two.component.scss'],
})
export class CourseFormTwoComponent implements OnInit {
  @Input() data: any;

  ngOnInit(): void {}
}
