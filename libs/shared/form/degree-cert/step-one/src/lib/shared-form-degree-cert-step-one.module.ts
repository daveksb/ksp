import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DegreeCertCoordinatorComponent } from './coordinator/coordinator.component';
import { DegreeInfoComponent } from './degree-info/degree-info.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [DegreeCertCoordinatorComponent, DegreeInfoComponent],
  exports: [DegreeCertCoordinatorComponent, DegreeInfoComponent],
})
export class SharedFormDegreeCertStepOneModule {}
