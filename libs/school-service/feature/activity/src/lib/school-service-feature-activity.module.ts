import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { ActivityEducationLevelComponent } from './activity-education-level/activity-education-level.component';
import { RouterModule, Routes } from '@angular/router';
import { SchoolServiceContainerPageComponent } from '@ksp/school-service/feature/container-page';
import { SharedUiTopNavModule } from '@ksp/shared/ui/top-nav';
import { SharedUiLicenseInfoModule } from '@ksp/shared/ui/license-info';
import { SharedUiFormModule } from '@ksp/shared/ui/form';
import { SchoolServiceUiStaffSearchModule } from '@ksp/school-service/ui/staff-search';

export const routes: Routes = [
  {
    path: '',
    component: SchoolServiceContainerPageComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ActivityListComponent },
      { path: 'detail', component: ActivityDetailComponent },
      { path: 'education-level', component: ActivityEducationLevelComponent },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedUiTopNavModule,
    SharedUiLicenseInfoModule,
    SharedUiFormModule,
    SchoolServiceUiStaffSearchModule
  ],
  declarations: [
    ActivityListComponent,
    ActivityDetailComponent,
    ActivityEducationLevelComponent,
  ],
  exports: [
    ActivityListComponent,
    ActivityDetailComponent,
    ActivityEducationLevelComponent,
  ],
})
export class SchoolServiceFeatureActivityModule {}
