import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DegreeCertStepOneComponent } from './step-one/step-one.component';
import { DegreeCertStepTwoComponent } from './step-two/step-two.component';
import { DegreeCertStepThreeComponent } from './step-three/step-three.component';
import { DegreeCertStepFourComponent } from './step-four/step-four.component';
import { DegreeCertStepFiveComponent } from './step-five/step-five.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedFormDegreeCertStepTwoModule } from '@ksp/shared/form/degree-cert/step-two';
import { SharedFormDegreeCertStepThreeModule } from '@ksp/shared/form/degree-cert/step-three';
import { UniServiceFormModule } from '@ksp/uni-service/form';
import { SharedFormDegreeCertStepOneModule } from '@ksp/shared/form/degree-cert/step-one';
import { DynamicComponentDirective } from '@ksp/shared/directive';
import {
  AddRowButtonComponent,
  UniWarnIncorrectComponent,
} from '@ksp/shared/ui';
import { TopNavComponent } from '@ksp/shared/menu';
import { DegreeCertSearchComponent } from '@ksp/shared/search';
import { RouterModule } from '@angular/router';
import { SharedFormUniCourseFormModule } from '@ksp/shared/form/uni-course-form';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatTabsModule,
    SharedFormOthersModule,
    MatTableModule,
    MatIconModule,
    SharedFormDegreeCertStepTwoModule,
    SharedFormDegreeCertStepThreeModule,
    UniServiceFormModule,
    SharedFormDegreeCertStepOneModule,
    DynamicComponentDirective,
    AddRowButtonComponent,
    TopNavComponent,
    DegreeCertSearchComponent,
    UniWarnIncorrectComponent,
    FormsModule,
    SharedFormUniCourseFormModule,
    MatDatepickerModule,
  ],
  declarations: [
    DegreeCertStepOneComponent,
    DegreeCertStepTwoComponent,
    DegreeCertStepThreeComponent,
    DegreeCertStepFourComponent,
    DegreeCertStepFiveComponent,
  ],
  exports: [
    DegreeCertStepOneComponent,
    DegreeCertStepTwoComponent,
    DegreeCertStepThreeComponent,
    DegreeCertStepFourComponent,
    DegreeCertStepFiveComponent,
  ],
})
export class SharedDegreeCertModule {}
