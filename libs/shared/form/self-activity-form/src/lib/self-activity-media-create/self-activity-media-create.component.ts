import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-self-activity-media-create',
  templateUrl: './self-activity-media-create.component.html',
  styleUrls: ['./self-activity-media-create.component.scss'],
})
export class SelfActivityMediaCreateComponent implements OnInit {
  @Input() data: any;

  constructor() {}

  ngOnInit(): void {}
}
