import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StaffListComponent } from './staff-list/staff-list.component';
import { SchoolContainerPageComponent } from '@ksp/school-service/feature/container-page';
import { LicenseSearchComponent } from './license-search/license-search.component';

import { StaffPersonInfoComponent } from './staff-person-info/staff-person-info.component';
import { AddStaffTeachingInfoComponent } from './add-staff-teaching-info/add-staff-teaching-info.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { BottomNavComponent } from '@ksp/shared/menu';
import { SchoolServiceUiStaffSearchModule } from '@ksp/school-service/ui/staff-search';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import {
  LicenseInfoComponent,
  LicenseTypeButtonGroupComponent,
  RequestHeaderInfoComponent,
} from '@ksp/shared/ui';
import { TopNavComponent } from '@ksp/shared/menu';
import { HttpClientModule } from '@angular/common/http';

export const routes: Routes = [
  {
    path: '',
    component: SchoolContainerPageComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: StaffListComponent },
      { path: 'license-search', component: LicenseSearchComponent },
      { path: 'staff-person-info', component: StaffPersonInfoComponent },
      { path: 'staff-person-info/:id', component: StaffPersonInfoComponent },
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
    HttpClientModule,
    RouterModule.forChild(routes),
    MatCheckboxModule,
    ReactiveFormsModule,
    MatTabsModule,
    SharedFormOthersModule,
    BottomNavComponent,
    TopNavComponent,
    SchoolServiceUiStaffSearchModule,
    MatTableModule,
    MatIconModule,
    RequestHeaderInfoComponent,
    LicenseTypeButtonGroupComponent,
    LicenseInfoComponent,
  ],
  declarations: [
    StaffListComponent,
    LicenseSearchComponent,
    StaffPersonInfoComponent,
    AddStaffTeachingInfoComponent,
  ],
  exports: [
    StaffListComponent,
    LicenseSearchComponent,
    StaffPersonInfoComponent,
    AddStaffTeachingInfoComponent,
  ],
})
export class SchoolServiceFeatureStaffManagementModule {}
