import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-self-activity-menter',
  templateUrl: './self-activity-menter.component.html',
  styleUrls: ['./self-activity-menter.component.scss'],
})
export class SelfActivityMenterComponent implements OnInit {
  @Input() data: any;

  constructor() {}

  ngOnInit(): void {}
}
