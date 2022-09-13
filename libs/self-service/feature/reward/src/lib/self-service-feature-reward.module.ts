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
import { SelfRewardRequestComponent } from './self-reward-request/self-reward-request.component';
import { AddRowButtonComponent } from '@ksp/shared/ui';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedFormSelfRewardFormModule } from '@ksp/shared/form/self-reward-form';
import { SelfServiceFormModule } from '@ksp/self-service/form';
import { SharedFormOthersModule } from '@ksp/shared/form/others';

export const routes: Routes = [
  {
    path: '',
    component: SelfServiceMasterPageComponent,
    children: [
      {
        path: 'request',
        component: SelfRewardRequestComponent,
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
  ],
  declarations: [
    ThaiTeacherRewardComponent,
    BestTeacherRewardComponent,
    PraiseTeacherRewardComponent,
    SeniorTeacherRewardComponent,
    ResearchRewardComponent,
    CouncilRewardComponent,
    SelfRewardRequestComponent,
  ],
  exports: [
    ThaiTeacherRewardComponent,
    BestTeacherRewardComponent,
    PraiseTeacherRewardComponent,
    SeniorTeacherRewardComponent,
    ResearchRewardComponent,
    CouncilRewardComponent,
    SelfRewardRequestComponent,
  ],
})
export class SelfServiceFeatureRewardModule {}
