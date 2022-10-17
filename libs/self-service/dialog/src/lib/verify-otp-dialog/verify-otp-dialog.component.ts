import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'ksp-verify-otp-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './verify-otp-dialog.component.html',
  styleUrls: ['./verify-otp-dialog.component.scss'],
})
export class VerifyOtpDialogComponent {
  constructor(private router: Router) {}

  nextStep() {
    this.router.navigate(['/register', 'th-step-3']);
  }
}
