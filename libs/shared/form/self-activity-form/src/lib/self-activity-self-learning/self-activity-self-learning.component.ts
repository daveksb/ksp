import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-self-activity-self-learning',
  templateUrl: './self-activity-self-learning.component.html',
  styleUrls: ['./self-activity-self-learning.component.scss'],
})
export class SelfActivitySelfLearningComponent implements OnInit {
  @Input() data: any;

  constructor() {}

  ngOnInit(): void {}
}
