import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EResearchRewardListComponent } from './e-research-reward-list/e-research-reward-list.component';
import { EResearchRewardDetailComponent } from './e-research-reward-detail/e-research-reward-detail.component';
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
  EServiceRewardCreateDeclareSearchComponent,
  EServiceRewardDeclareSearchComponent,
  EServiceRewardSearchComponent,
} from '@ksp/shared/search';
import { RequestNoPipe, ThaiDatePipe } from '@ksp/shared/pipe';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import {
  ValidateKspRequestComponent,
  ConsiderKspRequestComponent,
  RewardValidateRequestComponent,
} from '@ksp/e-service/e-license/approve-ksp-request';
import { EResearchRewardConfirmComponent } from './e-research-reward-confirm/e-research-reward-confirm.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EResearchRewardRejectComponent } from './e-research-reward-reject/e-research-reward-reject.component';
import { EServiceUiRewardRejectFormModule } from '@ksp/e-service/ui/reward-reject-form';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EResearchRewardCheckComponent } from './e-research-reward-check/e-research-reward-check.component';
import { EResearchRewardDeclareComponent } from './e-research-reward-declare/e-research-reward-declare.component';
import { EResearchRewardCreateDeclareComponent } from './e-research-reward-create-declare/e-research-reward-create-declare.component';

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
        component: EResearchRewardListComponent,
      },
      {
        path: 'detail/:id',
        component: EResearchRewardDetailComponent,
      },
      {
        path: 'confirm/:id',
        component: EResearchRewardConfirmComponent,
      },
      {
        path: 'reject/:id',
        component: EResearchRewardRejectComponent,
      },
      {
        path: 'check-list',
        component: EResearchRewardListComponent,
      },
      {
        path: 'check/:id',
        component: EResearchRewardDetailComponent,
      },
      {
        path: 'check-confirm/:id',
        component: EResearchRewardCheckComponent,
      },
      {
        path: 'declare',
        component: EResearchRewardDeclareComponent,
      },
      {
        path: 'create-declare',
        component: EResearchRewardCreateDeclareComponent,
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
    EServiceRewardDeclareSearchComponent,
    EServiceRewardCreateDeclareSearchComponent,
  ],
  declarations: [
    EResearchRewardListComponent,
    EResearchRewardDetailComponent,
    EResearchRewardConfirmComponent,
    EResearchRewardRejectComponent,
    EResearchRewardCheckComponent,
    EResearchRewardDeclareComponent,
    EResearchRewardCreateDeclareComponent,
  ],
  exports: [EResearchRewardListComponent, EResearchRewardDetailComponent],
})
export class EServiceProfessionalResearchRewardModule {}
