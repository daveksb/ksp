import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EThaiTeacherListComponent } from './e-thai-teacher-list/e-thai-teacher-list.component';
import { EThaiTeacherDetailComponent } from './e-thai-teacher-detail/e-thai-teacher-detail.component';
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
import { EThaiTeacherConfirmComponent } from './e-thai-teacher-confirm/e-thai-teacher-confirm.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EThaiTeacherRejectComponent } from './e-thai-teacher-reject/e-thai-teacher-reject.component';
import { EServiceUiRewardRejectFormModule } from '@ksp/e-service/ui/reward-reject-form';
import { EThaiTeacherAccountListComponent } from './e-thai-teacher-account-list/e-thai-teacher-account-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EThaiTeacherCreateAccountComponent } from './e-thai-teacher-create-account/e-thai-teacher-create-account.component';

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
        component: EThaiTeacherListComponent,
      },
      {
        path: 'detail/:id',
        component: EThaiTeacherDetailComponent,
      },
      {
        path: 'confirm/:id',
        component: EThaiTeacherConfirmComponent,
      },
      {
        path: 'reject/:id',
        component: EThaiTeacherRejectComponent,
      },
      {
        path: 'account-list',
        component: EThaiTeacherAccountListComponent,
      },
      {
        path: 'create-account',
        component: EThaiTeacherCreateAccountComponent,
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
    EThaiTeacherListComponent,
    EThaiTeacherDetailComponent,
    EThaiTeacherConfirmComponent,
    EThaiTeacherRejectComponent,
    EThaiTeacherAccountListComponent,
    EThaiTeacherCreateAccountComponent,
  ],
  exports: [EThaiTeacherListComponent, EThaiTeacherDetailComponent],
})
export class EServiceProfessionalThaiTeacherRewardModule {}
