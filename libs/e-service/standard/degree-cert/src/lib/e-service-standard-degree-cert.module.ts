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
import { DegreeCertApprovedSearchComponent, DegreeCertSearchComponent } from '@ksp/shared/search';
import { RouterModule } from '@angular/router';
import { FormApproveMeetingRecordComponent, FormMeetingRecordComponent } from '@ksp/e-service/ethics/form';
import { EServiceDegreeCertApprovedListComponent } from './list-approved/e-service-degree-cert-list-approved.component';
import { ImportStudentComponent } from './import-student/import-student.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { TableModule } from 'primeng/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormAddressTableComponent } from '@ksp/shared/form/others';
import { ConsiderStudentComponent } from './import-student/consider-student/consider-student.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EUniPipesModule } from '@ksp/shared/pipe';

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
    TableModule,
    SharedFormDegreeCertStepTwoModule,
    RequestHeaderInfoComponent,
    TopNavComponent,
    LicenseCheckComponent,
    FinalResultInfoComponent,
    ReactiveFormsModule,
    FormMeetingRecordComponent,
    DegreeCertSearchComponent,
    DegreeCertApprovedSearchComponent,
    MatDatepickerModule,
    FormAddressTableComponent,
    MatPaginatorModule,
    FormApproveMeetingRecordComponent,
    EUniPipesModule
  ],
  declarations: [
    EServiceDegreeCertListComponent,
    EServiceDegreeCertApprovedListComponent,
    VerifyComponent,
    ConsiderComponent,
    ApproveComponent,
    CheckComponent,
    FinalResultComponent,
    ImportStudentComponent,
    CourseDetailComponent,
    ConsiderStudentComponent
  ],
})
export class EServiceStandardDegreeCertModule {}
