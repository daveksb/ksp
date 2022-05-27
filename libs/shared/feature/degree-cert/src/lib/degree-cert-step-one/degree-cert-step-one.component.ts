import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-degree-cert-step-one',
  templateUrl: './degree-cert-step-one.component.html',
  styleUrls: ['./degree-cert-step-one.component.css'],
})
export class DegreeCertStepOneComponent {
  @Input() isViewForm = false;

  constructor(private router: Router) {}

  goToStep2() {
    this.router.navigate(['/', 'degree-cert', 'step-2']);
  }
}
