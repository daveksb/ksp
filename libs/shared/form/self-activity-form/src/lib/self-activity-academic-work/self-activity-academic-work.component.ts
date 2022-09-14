import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-self-activity-academic-work',
  templateUrl: './self-activity-academic-work.component.html',
  styleUrls: ['./self-activity-academic-work.component.scss'],
})
export class SelfActivityAcademicWorkComponent implements OnInit {
  @Input() data: any;

  constructor() {}

  ngOnInit(): void {}
}
