import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-activity-lecture-register',
  templateUrl: './activity-lecture-register.component.html',
  styleUrls: ['./activity-lecture-register.component.scss'],
})
export class ActivityLectureRegisterComponent {
  @Input() data: any;
}
