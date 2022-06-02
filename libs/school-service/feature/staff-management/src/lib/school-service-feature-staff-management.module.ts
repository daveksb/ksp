import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StaffListComponent } from './staff-list/staff-list.component';
import { SchoolServiceContainerPageComponent } from '@ksp/school-service/feature/container-page';
import { LicenseSearchComponent } from './license-search/license-search.component';
import { SharedUiTopNavModule } from '@ksp/shared/ui/top-nav';
import { AddStaffPersonInfoComponent } from './add-staff-person-info/add-staff-person-info.component';
import { AddStaffTeachingInfoComponent } from './add-staff-teaching-info/add-staff-teaching-info.component';
import { SharedUiLicenseInfoModule } from 'libs/shared/ui/license-info/src';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedUiFormModule } from '@ksp/shared/ui/form';
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';

export const routes: Routes = [
  {
    path: '',
    component: SchoolServiceContainerPageComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: StaffListComponent },
      { path: 'license-search', component: LicenseSearchComponent },
      { path: 'staff-person-info', component: AddStaffPersonInfoComponent },
      {
        path: 'staff-teaching-info',
        component: AddStaffTeachingInfoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedUiLicenseInfoModule,
    SharedUiTopNavModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    SharedUiFormModule,
    SharedUiBottomMenuModule
  ],
  declarations: [
    StaffListComponent,
    LicenseSearchComponent,
    AddStaffPersonInfoComponent,
    AddStaffTeachingInfoComponent,
  ],
  exports: [
    StaffListComponent,
    LicenseSearchComponent,
    AddStaffPersonInfoComponent,
    AddStaffTeachingInfoComponent,
  ],
})
export class SchoolServiceFeatureStaffManagementModule {}
