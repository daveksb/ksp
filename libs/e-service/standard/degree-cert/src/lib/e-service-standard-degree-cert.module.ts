import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DegreeCertListComponent } from './degree-cert-list/degree-cert-list.component';
import { SharedUiDegreeCertSearchFormModule } from '@ksp/shared/ui/degree-cert-search-form';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { StepThreeComponent } from './step-three/step-three.component';
import { StepFourComponent } from './step-four/step-four.component';
import { StepFiveComponent } from './step-five/step-five.component';
import { EServiceUiLicenseCheckModule } from '@ksp/e-service/ui/license-check';
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedFeatureDegreeCertModule } from '@ksp/shared-feature-degree-cert';
import { EServiceUiVerifyResultBoxModule } from '@ksp/e-service/ui/verify-result-box';
import { VerifyComponent } from './verify/verify.component';
import { ConsiderComponent } from './consider/consider.component';
import { ApproveComponent } from './approve/approve.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EServiceStandardDegreeCertRoutingModule } from './e-service-standard-degree-cert-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatCheckboxModule,
    EServiceUiLicenseCheckModule,
    EServiceUiVerifyResultBoxModule,
    EServiceStandardDegreeCertRoutingModule,
    SharedFeatureDegreeCertModule,
    SharedUiBottomMenuModule,
    SharedUiDegreeCertSearchFormModule,
    
  ],
  declarations: [
    DegreeCertListComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    StepFiveComponent,
    VerifyComponent,
    ConsiderComponent,
    ApproveComponent,
  ],
  exports: [
    DegreeCertListComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    StepFiveComponent,
    VerifyComponent,
    ConsiderComponent,
    ApproveComponent,
  ],
})
export class EServiceStandardDegreeCertModule {}
