import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-activity-diploma-receive',
  templateUrl: './activity-diploma-receive.component.html',
  styleUrls: ['./activity-diploma-receive.component.scss'],
})
export class ActivityDiplomaReceiveComponent {
  @Input() data: any;
}
