import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-self-service-register-step-one',
  templateUrl: './self-service-register-step-one.component.html',
  styleUrls: ['./self-service-register-step-one.component.scss'],
})
export class SelfServiceRegisterStepOneComponent {
  constructor(private router: Router) {}

  loginPage() {
    this.router.navigate(['/', 'login']);
  }

  nextPage() {
    this.router.navigate(['/', 'register-2']);
  }
}
