import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'self-service-register-step-one',
  templateUrl: './register-step-one.component.html',
  styleUrls: ['./register-step-one.component.scss'],
})
export class RegisterStepOneComponent {
  constructor(private router: Router) {}

  loginPage() {
    this.router.navigate(['/', 'login']);
  }

  nextPage() {
    this.router.navigate(['/', 'register', 'step-2']);
  }
}
