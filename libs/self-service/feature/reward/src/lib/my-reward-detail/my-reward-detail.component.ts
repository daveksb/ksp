import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ksp-my-reward-detail',
  templateUrl: './my-reward-detail.component.html',
  styleUrls: ['./my-reward-detail.component.scss'],
})
export class MyRewardDetailComponent implements OnInit {
  requestId?: number;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      console.log('res = ', params);
    });
  }

  back() {
    this.router.navigate(['/reward', 'list']);
  }
}
