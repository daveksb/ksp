import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThaiTeacherRewardComponent } from './thai-teacher-reward/thai-teacher-reward.component';
import { BestTeacherRewardComponent } from './best-teacher-reward/best-teacher-reward.component';
import { SeniorTeacherRewardComponent } from './senior-teacher-reward/senior-teacher-reward.component';
import { ResearchRewardComponent } from './research-reward/research-reward.component';
import { CouncilRewardComponent } from './council-reward/council-reward.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RequestStatusComponent } from '@ksp/self-service/ui';
import { RouterModule, Routes } from '@angular/router';
import { SelfServiceMasterPageComponent } from '@ksp/self-service/feature/master-page';
import { TopNavComponent } from '@ksp/shared/menu';
import { PraiseTeacherRewardComponent } from './praise-teacher-reward/praise-teacher-reward.component';
import { RequestRewardMainComponent } from './request-reward-main/request-reward-main.component';
import {
  AddRowButtonComponent,
  LicenseInfoComponent,
  UniFormBadgeComponent,
} from '@ksp/shared/ui';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedFormSelfRewardFormModule } from '@ksp/shared/form/self-reward-form';
import { SelfServiceFormModule } from '@ksp/self-service/form';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { MyRewardDetailComponent } from './my-reward-detail/my-reward-detail.component';
import { MyRewardListComponent } from './my-reward-list/my-reward-list.component';
import { MatTableModule } from '@angular/material/table';
import { HonorPinRequestComponent } from './honor-pin-request/honor-pin-request.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

export const routes: Routes = [
  {
    path: '',
    component: SelfServiceMasterPageComponent,
    children: [
      {
        path: 'list',
        component: MyRewardListComponent,
      },
      {
        path: 'request',
        component: RequestRewardMainComponent,
      },
      {
        path: 'request/:id',
        component: RequestRewardMainComponent,
      },
      {
        path: 'detail',
        component: MyRewardDetailComponent,
      },
      {
        path: 'detail/:id',
        component: MyRewardDetailComponent,
      },
      {
        path: 'honor-request',
        component: HonorPinRequestComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    SharedFormOthersModule,
    SelfServiceFormModule,
    RequestStatusComponent,
    TopNavComponent,
    SharedFormSelfRewardFormModule,
    AddRowButtonComponent,
    ReactiveFormsModule,
    LicenseInfoComponent,
    MatTableModule,
    UniFormBadgeComponent,
    MatDatepickerModule,
  ],
  declarations: [
    ThaiTeacherRewardComponent,
    BestTeacherRewardComponent,
    PraiseTeacherRewardComponent,
    SeniorTeacherRewardComponent,
    ResearchRewardComponent,
    CouncilRewardComponent,
    RequestRewardMainComponent,
    MyRewardDetailComponent,
    MyRewardListComponent,
    HonorPinRequestComponent,
  ],
  exports: [
    ThaiTeacherRewardComponent,
    BestTeacherRewardComponent,
    PraiseTeacherRewardComponent,
    SeniorTeacherRewardComponent,
    ResearchRewardComponent,
    CouncilRewardComponent,
    RequestRewardMainComponent,
    MyRewardDetailComponent,
    MyRewardListComponent,
    HonorPinRequestComponent,
  ],
})
export class SelfServiceFeatureRewardModule {}
