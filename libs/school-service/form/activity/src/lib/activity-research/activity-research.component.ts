import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-activity-research',
  templateUrl: './activity-research.component.html',
  styleUrls: ['./activity-research.component.scss'],
})
export class ActivityResearchComponent {
  @Input() data: any;
}
