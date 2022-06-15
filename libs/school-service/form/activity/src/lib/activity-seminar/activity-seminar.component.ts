import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-activity-seminar',
  templateUrl: './activity-seminar.component.html',
  styleUrls: ['./activity-seminar.component.scss'],
})
export class ActivitySeminarComponent {
  @Input() data: any;
}
