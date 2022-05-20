import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompleteDialogComponent } from '../complete-dialog/complete-dialog.component';

@Component({
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  @Input() title = 'def title';
  constructor(private dialog: MatDialog) {}

  cancel() {
    this.dialog.closeAll();
  }

  confirm() {
    this.dialog.closeAll();
    this.dialog.open(CompleteDialogComponent, {
      height: '275px',
      width: '350px',
    });
  }
}
