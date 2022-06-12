import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DegreeCertCoordinatorComponent } from './coordinator/coordinator.component';
import { DegreeInfoComponent } from './degree-info/degree-info.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DegreeCertCoordinatorComponent, DegreeInfoComponent],
  exports: [DegreeCertCoordinatorComponent, DegreeInfoComponent],
})
export class SharedFormDegreeCertStepOneModule {}
