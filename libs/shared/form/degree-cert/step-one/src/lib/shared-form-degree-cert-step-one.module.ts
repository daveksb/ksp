import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DegreeCertCoordinatorComponent } from './coordinator/coordinator.component';
import { DegreeInfoComponent } from './degree-info/degree-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  declarations: [DegreeCertCoordinatorComponent, DegreeInfoComponent],
  exports: [DegreeCertCoordinatorComponent, DegreeInfoComponent],
})
export class SharedFormDegreeCertStepOneModule {}
