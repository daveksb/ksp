import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepThreeTabOneComponent } from './step-three-tab-one/step-three-tab-one.component';
import { StepThreeTabTwoComponent } from './step-three-tab-two/step-three-tab-two.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [CommonModule, MatIconModule, MatTooltipModule, ReactiveFormsModule],
  declarations: [StepThreeTabOneComponent, StepThreeTabTwoComponent],
  exports: [StepThreeTabOneComponent, StepThreeTabTwoComponent],
})
export class SharedUiDegreeCertTabContentModule {}
