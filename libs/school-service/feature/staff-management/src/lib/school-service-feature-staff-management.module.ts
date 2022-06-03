import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StaffListComponent } from './staff-list/staff-list.component';
import { SchoolServiceContainerPageComponent } from '@ksp/school-service/feature/container-page';
import { LicenseSearchComponent } from './license-search/license-search.component';
import { SharedUiTopNavModule } from '@ksp/shared/ui/top-nav';
import { AddStaffPersonInfoComponent } from './add-staff-person-info/add-staff-person-info.component';
import { AddStaffTeachingInfoComponent } from './add-staff-teaching-info/add-staff-teaching-info.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedUiFormModule } from '@ksp/shared/ui/form';
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';
import { SharedUiLicenseInfoModule } from '@ksp/shared/ui/license-info';
import { SchoolServiceUiStaffSearchModule } from '@ksp/school-service/ui/staff-search';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

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
    RouterModule.forChild(routes),
    MatCheckboxModule,
    ReactiveFormsModule,
    MatTabsModule,
    SharedUiFormModule,
    SharedUiBottomMenuModule,
    SharedUiLicenseInfoModule,
    SharedUiTopNavModule,
    SchoolServiceUiStaffSearchModule,
    MatTableModule,
    MatIconModule,
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
