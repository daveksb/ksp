import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss'],
})
export class StepOneComponent {
  constructor(private router: Router) {}

  nextPage() {
    this.router.navigate(['./', 'degree-cert', 'step-2']);
  }

  prevPage() {
    this.router.navigate(['./', 'degree-cert', 'list']);
  }
}
