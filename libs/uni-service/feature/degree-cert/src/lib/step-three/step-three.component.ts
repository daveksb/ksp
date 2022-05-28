import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss'],
})
export class StepThreeComponent {
  constructor(private router: Router) {}

  nextPage() {
    this.router.navigate(['./', 'degree-cert', 'step-4']);
  }

  prevPage() {
    this.router.navigate(['./', 'degree-cert', 'step-2']);
  }
}
