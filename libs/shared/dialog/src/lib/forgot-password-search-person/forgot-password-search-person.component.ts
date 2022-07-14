import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordSetNewPasswordComponent } from '../forgot-password-set-new-password/forgot-password-set-new-password.component';

@Component({
  selector: 'ksp-forgot-password-search-person',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forgot-password-search-person.component.html',
  styleUrls: ['./forgot-password-search-person.component.scss'],
})
export class ForgotPasswordSearchPersonComponent {
  constructor(public dialog: MatDialog) {}

  cancel() {
    this.dialog.closeAll();
  }

  nextStep() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(ForgotPasswordSetNewPasswordComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      //console.log(`Dialog result: ${result}`);
    });
  }
}
