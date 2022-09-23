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
export class VerifyOtpForeignDialogComponent {
  constructor(private router: Router) {}
}
