import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-activity-innovation',
  templateUrl: './activity-innovation.component.html',
  styleUrls: ['./activity-innovation.component.scss'],
})
export class ActivityInnovationComponent {
  @Input() data: any;
}
