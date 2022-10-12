import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolInfoDetailComponent } from './school-info-detail/school-info-detail.component';
import { Route, RouterModule } from '@angular/router';
import { SchoolContainerPageComponent } from '@ksp/school-service/feature/container-page';
import { BottomNavComponent, TopNavComponent } from '@ksp/shared/menu';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import {
  FormCoordinatorInfoComponent,
  SharedFormSchoolRegisterModule,
} from '@ksp/shared/form/school/register';
import { CoordinatorInfoComponent } from '@ksp/school-service/feature/register';
import { ReactiveFormsModule } from '@angular/forms';

export const routes: Route[] = [
  {
    path: '',
    component: SchoolContainerPageComponent,
    children: [
      {
        path: 'detail',
        component: SchoolInfoDetailComponent,
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
    FormCoordinatorInfoComponent,
    BottomNavComponent,
    ReactiveFormsModule,
  ],
  declarations: [SchoolInfoDetailComponent],
  exports: [SchoolInfoDetailComponent],
})
export class SchoolServiceFeatureSchoolInfoModule {}
