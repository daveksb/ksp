import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ForeignTeacherIdRequestComponent } from './foreign-teacher-id-request/foreign-teacher-id-request.component';

import { SchoolServiceContainerPageComponent } from '@ksp/school-service/feature/container-page';
import { BottomNavComponent } from '@ksp/shared/menu';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { TopNavComponent } from '@ksp/shared/menu';

export const routes: Route[] = [
  {
    path: '',
    component: SchoolServiceContainerPageComponent,
    children: [
      {
        path: 'id-request',
        component: ForeignTeacherIdRequestComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TopNavComponent,
    SharedFormOthersModule,
    BottomNavComponent,
    RequestHeaderInfoComponent,
  ],
  declarations: [ForeignTeacherIdRequestComponent],
})
export class SchoolServiceFeatureForeignTeacherModule {}
