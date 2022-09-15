import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-self-activity-assessment',
  templateUrl: './self-activity-assessment.component.html',
  styleUrls: ['./self-activity-assessment.component.scss'],
})
export class SelfActivityAssessmentComponent implements OnInit {
  @Input() data: any;

  constructor() {}

  ngOnInit(): void {}
}
