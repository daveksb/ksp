import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss'],
})
export class StepThreeComponent {
  constructor(private router: Router) {}

  cancel() {
    this.router.navigate(['./', 'degree-cert']);
  }

  nextPage() {
    this.router.navigate(['./', 'degree-cert', 'step-4']);
  }

  prevPage() {
    this.router.navigate(['./', 'degree-cert', 'step-2']);
  }
}
