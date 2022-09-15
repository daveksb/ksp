import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'ksp-verify-otp-foreign-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './verify-otp-foreign-dialog.component.html',
  styleUrls: ['./verify-otp-foreign-dialog.component.scss'],
})
export class VerifyOtpForeignDialogComponent implements OnInit {
  constructor(private router: Router) {}

  nextStep() {
    this.router.navigate(['/', 'register', 'en-step-3']);
  }

  ngOnInit(): void {}
}
