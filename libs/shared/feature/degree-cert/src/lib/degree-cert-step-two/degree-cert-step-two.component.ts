import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-degree-cert-step-two',
  templateUrl: './degree-cert-step-two.component.html',
  styleUrls: ['./degree-cert-step-two.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DegreeCertStepTwoComponent {
  constructor(private router: Router) {}

  goToStep1() {
    this.router.navigate(['/', 'degree-cert', 'step-1']);
  }

  goToStep3() {
    this.router.navigate(['/', 'degree-cert', 'step-3']);
  }
}
