import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-osoi-ranking',
  templateUrl: './osoi-ranking.component.html',
  styleUrls: ['./osoi-ranking.component.scss'],
})
export class OsoiRankingComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  cancel() {
    this.router.navigate(['/', 'one-school-one-innovation', 'ranking-list']);
  }

  next() {
    this.router.navigate(['/', 'one-school-one-innovation', 'objection']);
  }
}
