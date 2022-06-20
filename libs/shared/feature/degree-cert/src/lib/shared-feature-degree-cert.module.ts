import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DegreeCertListComponent } from './list/list.component';
import { DegreeCertStepOneComponent } from './step-one/step-one.component';
import { DegreeCertStepTwoComponent } from './step-two/step-two.component';
import { DegreeCertStepThreeComponent } from './step-three/step-three.component';
import { DegreeCertStepFourComponent } from './step-four/step-four.component';
import { DegreeCertStepFiveComponent } from './step-five/step-five.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedFormDegreeCertStepTwoModule } from '@ksp/shared/form/degree-cert/step-two';
import { SharedFormDegreeCertStepThreeModule } from '@ksp/shared/form/degree-cert/step-three';
import { UniServiceUiFormsModule } from '@ksp/uni-service/ui/forms';
import { SharedFormDegreeCertStepOneModule } from '@ksp/shared/form/degree-cert/step-one';
import { DynamicComponentDirective } from '@ksp/shared/directive';
import { AddRowButtonComponent } from '@ksp/shared/ui/add-row-button';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    SharedFormOthersModule,
    MatTableModule,
    MatIconModule,
    SharedFormDegreeCertStepTwoModule,
    SharedFormDegreeCertStepThreeModule,
    UniServiceUiFormsModule,
    SharedFormDegreeCertStepOneModule,
    DynamicComponentDirective,
    AddRowButtonComponent,
  ],
  declarations: [
    DegreeCertListComponent,
    DegreeCertStepOneComponent,
    DegreeCertStepTwoComponent,
    DegreeCertStepThreeComponent,
    DegreeCertStepFourComponent,
    DegreeCertStepFiveComponent,
  ],
  exports: [
    DegreeCertListComponent,
    DegreeCertStepOneComponent,
    DegreeCertStepTwoComponent,
    DegreeCertStepThreeComponent,
    DegreeCertStepFourComponent,
    DegreeCertStepFiveComponent,
  ],
})
export class SharedFeatureDegreeCertModule {}
