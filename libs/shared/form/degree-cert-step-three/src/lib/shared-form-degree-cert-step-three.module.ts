import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachingComponent } from './teaching/teaching.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedUiAddRowButtonModule } from '@ksp/shared/ui/add-row-button';
import { TrainingComponent } from './training/training.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    SharedUiAddRowButtonModule,
  ],
  declarations: [TrainingComponent, TeachingComponent],
  exports: [TrainingComponent, TeachingComponent],
})
export class SharedFormDegreeCertStepThreeModule {}
