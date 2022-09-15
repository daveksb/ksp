import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-self-activity-article-writing',
  templateUrl: './self-activity-article-writing.component.html',
  styleUrls: ['./self-activity-article-writing.component.scss'],
})
export class SelfActivityArticleWritingComponent implements OnInit {
  @Input() data: any;

  constructor() {}

  ngOnInit(): void {}
}
