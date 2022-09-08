import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'ksp-form-verify-otp-foreign',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './form-verify-otp-foreign.component.html',
  styleUrls: ['./form-verify-otp-foreign.component.scss'],
})
export class FormVerifyOtpForeignComponent {
  constructor(private router: Router) {}

  nextStep() {
    this.router.navigate(['/', 'register', 'en-step-3']);
  }
}
