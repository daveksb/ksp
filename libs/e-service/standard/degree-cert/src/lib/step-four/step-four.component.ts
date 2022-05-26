import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.scss'],
})
export class StepFourComponent {
  constructor(private router: Router) {}

  nextPage() {
    this.router.navigate(['./', 'degree-cert', 'step-5']);
  }
}
