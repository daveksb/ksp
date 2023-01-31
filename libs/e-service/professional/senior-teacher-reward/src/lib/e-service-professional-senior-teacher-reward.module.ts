import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ESeniorTeacherListComponent } from './e-senior-teacher-list/e-senior-teacher-list.component';
import { ESeniorTeacherDetailComponent } from './e-senior-teacher-detail/e-senior-teacher-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { SharedFormSelfRewardFormModule } from '@ksp/shared/form/self-reward-form';
import { TopNavComponent, BottomNavComponent } from '@ksp/shared/menu';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { SelfServiceFormModule } from '@ksp/self-service/form';
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
import { ESeniorTeacherConfirmComponent } from './e-senior-teacher-confirm/e-senior-teacher-confirm.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ESeniorTeacherRejectComponent } from './e-senior-teacher-reject/e-senior-teacher-reject.component';
import { EServiceUiRewardRejectFormModule } from '@ksp/e-service/ui/reward-reject-form';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ESeniorTeacherAccountListComponent } from './e-senior-teacher-account-list/e-senior-teacher-account-list.component';
import { ESeniorTeacherCreateAccountComponent } from './e-senior-teacher-create-account/e-senior-teacher-create-account.component';

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
        component: ESeniorTeacherListComponent,
      },
      {
        path: 'detail/:id',
        component: ESeniorTeacherDetailComponent,
      },
      {
        path: 'confirm/:id',
        component: ESeniorTeacherConfirmComponent,
      },
      {
        path: 'reject/:id',
        component: ESeniorTeacherRejectComponent,
      },
      {
        path: 'account-list',
        component: ESeniorTeacherAccountListComponent,
      },
      {
        path: 'create-account',
        component: ESeniorTeacherCreateAccountComponent,
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
    ESeniorTeacherListComponent,
    ESeniorTeacherDetailComponent,
    ESeniorTeacherConfirmComponent,
    ESeniorTeacherRejectComponent,
    ESeniorTeacherAccountListComponent,
    ESeniorTeacherCreateAccountComponent,
  ],
  exports: [ESeniorTeacherListComponent, ESeniorTeacherDetailComponent],
})
export class EServiceProfessionalSeniorTeacherRewardModule {}
