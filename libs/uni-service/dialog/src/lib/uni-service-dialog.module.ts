import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingAddressComponent } from './training-address/training-address.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddRowButtonComponent } from '@ksp/shared/ui';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { HistoryRequestAdmissionDialogComponent } from './history-request-admission-dialog/history-request-admission-dialog.component';
import { ViewHistoryAdmissionComponent } from './view-history-dialog/view-history-dialog.component';
import { TableModule } from 'primeng/table';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormAddressTableComponent } from '@ksp/shared/form/others';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
    AddRowButtonComponent,
    HistoryRequestAdmissionDialogComponent,
    TableModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    FormAddressTableComponent,
  ],
  declarations: [TrainingAddressComponent, ViewHistoryAdmissionComponent],
  exports: [TrainingAddressComponent, ViewHistoryAdmissionComponent],
})
export class UniServiceDialogModule {}
