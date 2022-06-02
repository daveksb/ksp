import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss'],
})
export class ActivityDetailComponent {
  constructor(private router: Router) {}

  next() {
    this.router.navigate(['./', 'activity', 'education-level']);
  }
}
