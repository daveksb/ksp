import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EServiceDegreeCertListComponent } from './list/e-service-degree-cert-list.component';
import { BottomNavComponent } from '@ksp/shared/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedDegreeCertModule } from '@ksp/shared/degree-cert';
import { EServiceUiVerifyResultBoxModule } from '@ksp/e-service/ui/verify-result-box';
import { VerifyComponent } from './verify/verify.component';
import { ConsiderComponent } from './consider/consider.component';
import { ApproveComponent } from './approve/approve.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EServiceStandardDegreeCertRoutingModule } from './e-service-standard-degree-cert-routing.module';
import { CheckComponent } from './check/check.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { SharedFormDegreeCertStepOneModule } from '@ksp/shared/form/degree-cert/step-one';
import { MatIconModule } from '@angular/material/icon';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { SharedFormDegreeCertStepTwoModule } from '@ksp/shared/form/degree-cert/step-two';
import { FinalResultComponent } from './final-result/final-result.component';
import { TopNavComponent } from '@ksp/shared/menu';
import {
  FinalResultInfoComponent,
  LicenseCheckComponent,
} from '@ksp/e-service/ui/license-check';
import { ReactiveFormsModule } from '@angular/forms';
import { DegreeCertSearchComponent } from '@ksp/shared/search';
import { RouterModule } from '@angular/router';
import { FormMeetingRecordComponent } from '@ksp/e-service/ethics/form';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatTableModule,
    MatCheckboxModule,
    EServiceUiVerifyResultBoxModule,
    EServiceStandardDegreeCertRoutingModule,
    SharedDegreeCertModule,
    BottomNavComponent,
    SharedDegreeCertModule,
    SharedFormDegreeCertStepOneModule,
    MatStepperModule,
    MatTabsModule,
    MatIconModule,
    SharedFormDegreeCertStepTwoModule,
    RequestHeaderInfoComponent,
    TopNavComponent,
    LicenseCheckComponent,
    FinalResultInfoComponent,
    ReactiveFormsModule,
    FormMeetingRecordComponent,
    DegreeCertSearchComponent,
    MatPaginatorModule,
  ],
  declarations: [
    EServiceDegreeCertListComponent,
    VerifyComponent,
    ConsiderComponent,
    ApproveComponent,
    CheckComponent,
    FinalResultComponent,
  ],
})
export class EServiceStandardDegreeCertModule {}
