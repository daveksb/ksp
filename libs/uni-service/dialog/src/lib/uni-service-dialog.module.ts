import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingAddressComponent } from './training-address/training-address.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddRowButtonComponent } from '@ksp/shared/ui';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { HistoryRequestAdmissionDialogComponent } from './history-request-admission-dialog/history-request-admission-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
    AddRowButtonComponent,
    HistoryRequestAdmissionDialogComponent
  ],
  declarations: [TrainingAddressComponent],
  exports: [TrainingAddressComponent],
})
export class UniServiceDialogModule {}
