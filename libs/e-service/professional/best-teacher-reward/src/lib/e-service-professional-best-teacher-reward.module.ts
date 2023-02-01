import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EBestTeacherListComponent } from './e-best-teacher-list/e-best-teacher-list.component';
import { EBestTeacherDetailComponent } from './e-best-teacher-detail/e-best-teacher-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { TopNavComponent, BottomNavComponent } from '@ksp/shared/menu';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { SelfServiceFormModule } from '@ksp/self-service/form';
import { SharedFormSelfRewardFormModule } from '@ksp/shared/form/self-reward-form';
import {
  EServiceRewardAccountSearchComponent,
  EServiceRewardRequestSearchComponent,
  EServiceRewardSearchComponent,
} from '@ksp/shared/search';
import { RequestNoPipe, ThaiDatePipe } from '@ksp/shared/pipe';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import {
  ValidateKspRequestComponent,
  ConsiderKspRequestComponent,
  RewardValidateRequestComponent,
} from '@ksp/e-service/e-license/approve-ksp-request';
import { EBestTeacherConfirmComponent } from './e-best-teacher-confirm/e-best-teacher-confirm.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EBestTeacherRejectComponent } from './e-best-teacher-reject/e-best-teacher-reject.component';
import { EServiceUiRewardRejectFormModule } from '@ksp/e-service/ui/reward-reject-form';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EBestTeacherAccountListComponent } from './e-best-teacher-account-list/e-best-teacher-account-list.component';
import { EBestTeacherCreateAccountComponent } from './e-best-teacher-create-account/e-best-teacher-create-account.component';

const routes: Routes = [
  {
    path: '',
    component: EServiceContainerPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: EBestTeacherListComponent,
      },
      {
        path: 'detail/:id',
        component: EBestTeacherDetailComponent,
      },
      {
        path: 'confirm/:id',
        component: EBestTeacherConfirmComponent,
      },
      {
        path: 'reject/:id',
        component: EBestTeacherRejectComponent,
      },
      {
        path: 'account-list',
        component: EBestTeacherAccountListComponent,
      },
      {
        path: 'create-account',
        component: EBestTeacherCreateAccountComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TopNavComponent,
    MatTableModule,
    MatTabsModule,
    SharedFormOthersModule,
    ReactiveFormsModule,
    SharedFormSelfRewardFormModule,
    MatDialogModule,
    BottomNavComponent,
    RequestHeaderInfoComponent,
    SelfServiceFormModule,
    EServiceRewardSearchComponent,
    ThaiDatePipe,
    LicenseCheckComponent,
    ValidateKspRequestComponent,
    MatPaginatorModule,
    RequestNoPipe,
    EServiceUiRewardRejectFormModule,
    RewardValidateRequestComponent,
    MatProgressSpinnerModule,
    EServiceRewardAccountSearchComponent,
    EServiceRewardRequestSearchComponent,
  ],
  declarations: [
    EBestTeacherListComponent,
    EBestTeacherDetailComponent,
    EBestTeacherConfirmComponent,
    EBestTeacherRejectComponent,
    EBestTeacherAccountListComponent,
    EBestTeacherCreateAccountComponent,
  ],
  exports: [EBestTeacherListComponent, EBestTeacherDetailComponent],
})
export class EServiceProfessionalBestTeacherRewardModule {}
