import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'uni-service-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent {
  constructor(private router: Router) {}

  rows = [1, 2, 3, 4];

  goToStudentList() {
    this.router.navigate(['./', 'graduate-list', 'import-student']);
  }

  goToGraduateList() {
    this.router.navigate(['./', 'graduate-list', 'import-student']);
  }
}
