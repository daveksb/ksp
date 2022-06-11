import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { ActivityEducationLevelComponent } from './activity-education-level/activity-education-level.component';
import { RouterModule, Routes } from '@angular/router';
import { SchoolServiceContainerPageComponent } from '@ksp/school-service/feature/container-page';
import { SharedUiTopNavModule } from '@ksp/shared/ui/top-nav';
import { SharedUiLicenseInfoModule } from '@ksp/shared/ui/license-info';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { SchoolServiceUiStaffSearchModule } from '@ksp/school-service/ui/staff-search';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { EServiceUiAccusationInfoModule } from '@ksp/e-service/ui/accusation-info';

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
    SharedFormOthersModule,
    SchoolServiceUiStaffSearchModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    SharedUiBottomMenuModule,
    MatTableModule,
    MatIconModule,
    EServiceUiAccusationInfoModule,
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
