import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'uni-service-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.scss'],
})
export class CourseSearchComponent {
  constructor(private router: Router) {}

  nextPage() {
    this.router.navigate(['/', '', 'step-1']);
  }
}
