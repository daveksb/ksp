import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepTwoTabOneComponent } from './step-two-tab-one/step-two-tab-one.component';
import { StepTwoTabTwoComponent } from './step-two-tab-two/step-two-tab-two.component';
import { StepTwoTabThreeComponent } from './step-two-tab-three/step-two-tab-three.component';
import { StepTwoTabFourComponent } from './step-two-tab-four/step-two-tab-four.component';
import { StepThreeTabOneComponent } from './step-three-tab-one/step-three-tab-one.component';
import { StepThreeTabTwoComponent } from './step-three-tab-two/step-three-tab-two.component';
import { StepTwoTabOneSecondComponent } from './step-two-tab-one-second/step-two-tab-one-second.component';
import { SharedUiAddRowButtonModule } from '@ksp/shared/ui/add-row-button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    SharedUiAddRowButtonModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
  declarations: [
    StepTwoTabOneComponent,
    StepTwoTabTwoComponent,
    StepTwoTabThreeComponent,
    StepTwoTabFourComponent,
    StepThreeTabOneComponent,
    StepThreeTabTwoComponent,
    StepTwoTabOneSecondComponent,
  ],
  exports: [
    StepTwoTabOneComponent,
    StepTwoTabTwoComponent,
    StepTwoTabThreeComponent,
    StepTwoTabFourComponent,
    StepThreeTabOneComponent,
    StepThreeTabTwoComponent,
    StepTwoTabOneSecondComponent,
  ],
})
export class SharedUiDegreeCertTabContentModule {}
