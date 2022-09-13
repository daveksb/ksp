import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-self-activity-book-writing',
  templateUrl: './self-activity-book-writing.component.html',
  styleUrls: ['./self-activity-book-writing.component.scss'],
})
export class SelfActivityBookWritingComponent implements OnInit {
  @Input() data: any;

  constructor() {}

  ngOnInit(): void {}
}
