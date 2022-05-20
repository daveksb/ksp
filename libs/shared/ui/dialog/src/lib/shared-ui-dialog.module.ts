import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CompleteDialogComponent } from './complete-dialog/complete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [CommonModule, MatDialogModule],
  declarations: [ConfirmDialogComponent, CompleteDialogComponent],
  exports: [ConfirmDialogComponent, CompleteDialogComponent],
})
export class SharedUiDialogModule {}
