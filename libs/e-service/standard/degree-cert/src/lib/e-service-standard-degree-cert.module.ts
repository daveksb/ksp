import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DegreeCertListComponent } from './list/list.component';
import { EServiceUiLicenseCheckModule } from '@ksp/e-service/ui/license-check';
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedFeatureDegreeCertModule } from '@ksp/shared/feature/degree-cert';
import { EServiceUiVerifyResultBoxModule } from '@ksp/e-service/ui/verify-result-box';
import { VerifyComponent } from './verify/verify.component';
import { ConsiderComponent } from './consider/consider.component';
import { ApproveComponent } from './approve/approve.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EServiceStandardDegreeCertRoutingModule } from './e-service-standard-degree-cert-routing.module';
import { SharedFormDegreeCertSearchModule } from '@ksp/shared/form/degree-cert/search';
import { CheckComponent } from './check/check.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { SharedFormDegreeCertStepOneModule } from '@ksp/shared/form/degree-cert/step-one';
import { MatIconModule } from '@angular/material/icon';
import { RequestHeaderInfoComponent } from '@ksp/shared/new-ui';
import { SharedFormDegreeCertStepTwoModule } from '@ksp/shared/form/degree-cert/step-two';
import { FinalResultComponent } from './final-result/final-result.component';
import { TopNavComponent } from '@ksp/shared/menu';

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
    SharedFormDegreeCertSearchModule,
    SharedFeatureDegreeCertModule,
    SharedFormDegreeCertStepOneModule,
    MatStepperModule,
    MatTabsModule,
    MatIconModule,
    SharedFormDegreeCertStepTwoModule,
    RequestHeaderInfoComponent,
    TopNavComponent,
  ],
  declarations: [
    DegreeCertListComponent,
    VerifyComponent,
    ConsiderComponent,
    ApproveComponent,
    CheckComponent,
    FinalResultComponent,
  ],
})
export class EServiceStandardDegreeCertModule {}
