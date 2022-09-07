import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ksp-self-reward-request',
  templateUrl: './self-reward-request.component.html',
  styleUrls: ['./self-reward-request.component.scss'],
})
export class SelfRewardRequestComponent implements OnInit {
  pageType = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((res) => {
      this.pageType = Number(res['type']);
      //console.log('res = ', this.pageType);
    });
  }
}
