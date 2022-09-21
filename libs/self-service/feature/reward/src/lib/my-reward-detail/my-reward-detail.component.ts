import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-my-reward-detail',
  templateUrl: './my-reward-detail.component.html',
  styleUrls: ['./my-reward-detail.component.scss'],
})
export class MyRewardDetailComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  back() {
    this.router.navigate(['/', 'reward', 'list']);
  }
}
