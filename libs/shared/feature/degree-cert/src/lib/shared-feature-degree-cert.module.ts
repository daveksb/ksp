import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DegreeCertHomeComponent } from './degree-cert-home/degree-cert-home.component';
import { DegreeCertStepOneComponent } from './degree-cert-step-one/degree-cert-step-one.component';
import { DegreeCertStepTwoComponent } from './degree-cert-step-two/degree-cert-step-two.component';
import { DegreeCertStepThreeComponent } from './degree-cert-step-three/degree-cert-step-three.component';
import { DegreeCertStepFourComponent } from './degree-cert-step-four/degree-cert-step-four.component';
import { DegreeCertStepFiveComponent } from './degree-cert-step-five/degree-cert-step-five.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedUiFormModule } from '@ksp/shared/ui/form';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedDirectiveModule } from '@ksp/shared/directive';
import { SharedUiAddRowButtonModule } from '@ksp/shared/ui/add-row-button';
import { SharedFormDegreeCertStepTwoModule } from '@ksp/shared/form/degree-cert-step-two';
import { SharedFormDegreeCertStepThreeModule } from '@ksp/shared/form/degree-cert-step-three';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    SharedUiFormModule,
    MatTableModule,
    MatIconModule,
    SharedDirectiveModule,
    SharedUiAddRowButtonModule,
    SharedFormDegreeCertStepTwoModule,
    SharedFormDegreeCertStepThreeModule,
  ],
  declarations: [
    DegreeCertHomeComponent,
    DegreeCertStepOneComponent,
    DegreeCertStepTwoComponent,
    DegreeCertStepThreeComponent,
    DegreeCertStepFourComponent,
    DegreeCertStepFiveComponent,
  ],
  exports: [
    DegreeCertHomeComponent,
    DegreeCertStepOneComponent,
    DegreeCertStepTwoComponent,
    DegreeCertStepThreeComponent,
    DegreeCertStepFourComponent,
    DegreeCertStepFiveComponent,
  ],
})
export class SharedFeatureDegreeCertModule {}
