import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './register-foreign-step-one.component.html',
  styleUrls: ['./register-foreign-step-one.component.scss'],
})
export class RegisterForeignStepOneComponent {
  constructor(private router: Router) {}

  next() {
    this.router.navigate(['/register', 'en-step-2']);
  }

  loginPage() {
    this.router.navigate(['/login']);
  }
}
