import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-activity-academic-archivement',
  templateUrl: './activity-academic-archivement.component.html',
  styleUrls: ['./activity-academic-archivement.component.scss'],
})
export class ActivityAcademicArchivementComponent {
  @Input() data: any;
}
