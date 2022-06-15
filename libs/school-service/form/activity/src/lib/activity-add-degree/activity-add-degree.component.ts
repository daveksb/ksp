import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-activity-add-degree',
  templateUrl: './activity-add-degree.component.html',
  styleUrls: ['./activity-add-degree.component.scss'],
})
export class ActivityAddDegreeComponent {
  @Input() data: any;
}
