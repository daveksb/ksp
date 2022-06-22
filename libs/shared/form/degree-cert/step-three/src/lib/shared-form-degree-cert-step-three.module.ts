import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachingComponent } from './teaching/teaching.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TrainingComponent } from './training/training.component';
import { AddRowButtonComponent } from '@ksp/shared/new-ui';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    AddRowButtonComponent,
  ],
  declarations: [TrainingComponent, TeachingComponent],
  exports: [TrainingComponent, TeachingComponent],
})
export class SharedFormDegreeCertStepThreeModule {}
