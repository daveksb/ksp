import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-degree-cert-step-three',
  templateUrl: './degree-cert-step-three.component.html',
  styleUrls: ['./degree-cert-step-three.component.css'],
})
export class DegreeCertStepThreeComponent {
  constructor(private router: Router) {}

  goToStep2() {
    this.router.navigate(['/', 'degree-cert', 'step-2']);
  }

  goToStep4() {
    this.router.navigate(['/', 'degree-cert', 'step-4']);
  }
}
