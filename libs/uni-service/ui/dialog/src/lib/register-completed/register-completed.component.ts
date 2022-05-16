import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  templateUrl: './register-completed.component.html',
  styleUrls: ['./register-completed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterCompletedComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  login() {
    this.dialog.closeAll();
    this.router.navigate(['/', 'login']);
  }
}
