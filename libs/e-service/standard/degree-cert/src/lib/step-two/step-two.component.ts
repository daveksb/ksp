import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss'],
})
export class StepTwoComponent {
  constructor(private router: Router) {}

  cancel() {
    this.router.navigate(['./', 'degree-cert']);
  }

  nextPage() {
    this.router.navigate(['./', 'degree-cert', 'step-3']);
  }

  prevPage() {
    this.router.navigate(['./', 'degree-cert', 'step-1']);
  }
}
