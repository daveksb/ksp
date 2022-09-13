import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { VerifyOtpDialogComponent } from '../verify-otp-dialog/verify-otp-dialog.component';

@Component({
  selector: 'ksp-verify-phone-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './verify-phone-dialog.component.html',
  styleUrls: ['./verify-phone-dialog.component.scss'],
})
export class VerifyPhoneDialogComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(VerifyOtpDialogComponent, {
      width: '600px',
    });
  }

  ngOnInit(): void {}
}
