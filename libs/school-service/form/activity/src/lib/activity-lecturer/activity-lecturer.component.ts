import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-activity-lecturer',
  templateUrl: './activity-lecturer.component.html',
  styleUrls: ['./activity-lecturer.component.scss'],
})
export class ActivityLecturerComponent {
  @Input() data: any;
}
