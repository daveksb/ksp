import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-activity-study-tour',
  templateUrl: './activity-study-tour.component.html',
  styleUrls: ['./activity-study-tour.component.scss'],
})
export class ActivityStudyTourComponent {
  @Input() data: any;
}
