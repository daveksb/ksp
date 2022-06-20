import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CompleteDialogComponent } from './complete-dialog/complete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FilesPreviewComponent } from './files-preview/files-preview.component';
import { EServiceUiLicenseCheckModule } from '@ksp/e-service/ui/license-check';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    EServiceUiLicenseCheckModule,
  ],
  declarations: [
    ConfirmDialogComponent,
    CompleteDialogComponent,
    FilesPreviewComponent,
  ],
  exports: [
    ConfirmDialogComponent,
    CompleteDialogComponent,
    FilesPreviewComponent,
  ],
})
export class SharedUiDialogModule {}
