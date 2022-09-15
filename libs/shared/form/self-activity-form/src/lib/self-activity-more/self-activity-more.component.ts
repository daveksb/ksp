import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-self-activity-more',
  templateUrl: './self-activity-more.component.html',
  styleUrls: ['./self-activity-more.component.scss'],
})
export class SelfActivityMoreComponent implements OnInit {
  @Input() data: any;

  constructor() {}

  ngOnInit(): void {}
}
