import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-register-completed',
  templateUrl: './register-completed.component.html',
  styleUrls: ['./register-completed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterCompletedComponent {
  constructor(private router: Router, private dialogRef: MatDialog) {}

  loginPage() {
    this.dialogRef.closeAll();
    this.router.navigate(['/', 'login']);
  }
}
