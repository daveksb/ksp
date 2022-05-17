import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-req-degree-cert-step-two',
  templateUrl: './req-degree-cert-step-two.component.html',
  styleUrls: ['./req-degree-cert-step-two.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ReqDegreeCertStepTwoComponent {
  constructor(private router: Router) {}

  goToStep1() {
    this.router.navigate(['/', 'degree-cert', 'step-1']);
  }

  goToStep3() {
    this.router.navigate(['/', 'degree-cert', 'step-3']);
  }
}
