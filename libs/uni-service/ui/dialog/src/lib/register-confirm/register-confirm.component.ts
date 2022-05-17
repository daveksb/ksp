import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterCompletedComponent } from '../register-completed/register-completed.component';

@Component({
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterConfirmComponent {
  constructor(private dialog: MatDialog) {}

  cancel() {
    this.dialog.closeAll();
  }

  confirm() {
    this.dialog.closeAll();
    this.dialog.open(RegisterCompletedComponent, {
      height: '275px',
      width: '350px',
    });
  }
}
