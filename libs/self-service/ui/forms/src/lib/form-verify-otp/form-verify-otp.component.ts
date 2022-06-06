import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './form-verify-otp.component.html',
  styleUrls: ['./form-verify-otp.component.scss'],
})
export class FormVerifyOtpComponent {
  constructor(private router: Router) {}

  nextStep() {
    this.router.navigate(['/', 'register', 'step-3']);
  }
}
