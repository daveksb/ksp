import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-activity-reward',
  templateUrl: './activity-reward.component.html',
  styleUrls: ['./activity-reward.component.scss'],
})
export class ActivityRewardComponent {
  @Input() data: any;
}
