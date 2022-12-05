import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestRewardComponent } from './request-reward/request-reward.component';
import { Route, RouterModule } from '@angular/router';
import { SchoolContainerPageComponent } from '@ksp/school-service/feature/container-page';
import {
  AddRowButtonComponent,
  RequestHeaderInfoComponent,
} from '@ksp/shared/ui';
import { BottomNavComponent, TopNavComponent } from '@ksp/shared/menu';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestRewardFormComponent } from '@ksp/shared/form/school/request-reward';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export const routes: Route[] = [
  {
    path: '',
    component: SchoolContainerPageComponent,
    children: [
      {
        path: 'detail',
        component: RequestRewardComponent,
      },
      {
        path: 'detail/:id',
        component: RequestRewardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RequestHeaderInfoComponent,
    TopNavComponent,
    SharedFormOthersModule,
    BottomNavComponent,
    AddRowButtonComponent,
    ReactiveFormsModule,
    RequestRewardFormComponent,
    MatProgressSpinnerModule,
  ],
  declarations: [RequestRewardComponent],
  exports: [RequestRewardComponent],
})
export class SchoolServiceFeatureRequestRewardModule {}
