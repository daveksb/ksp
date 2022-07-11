import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestRewardDetailComponent } from './request-reward-detail/request-reward-detail.component';
import { Route, RouterModule } from '@angular/router';
import { SchoolContainerPageComponent } from '@ksp/school-service/feature/container-page';
import { AddRowButtonComponent, RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { BottomNavComponent, TopNavComponent } from '@ksp/shared/menu';
import { SharedFormOthersModule } from '@ksp/shared/form/others';

export const routes: Route[] = [
  {
    path: '',
    component: SchoolContainerPageComponent,
    children: [
      {
        path: 'detail',
        component: RequestRewardDetailComponent,
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
  ],
  declarations: [RequestRewardDetailComponent],
  exports: [RequestRewardDetailComponent],
})
export class SchoolServiceFeatureRequestRewardModule {}
