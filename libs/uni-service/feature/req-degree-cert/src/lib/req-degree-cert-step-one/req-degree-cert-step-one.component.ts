import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-req-degree-cert-step-one',
  templateUrl: './req-degree-cert-step-one.component.html',
  styleUrls: ['./req-degree-cert-step-one.component.css'],
})
export class ReqDegreeCertStepOneComponent {
  constructor(private router: Router) {}

  goToStep2() {
    this.router.navigate(['/', 'request-degree-cert', 'step-2']);
  }
}
