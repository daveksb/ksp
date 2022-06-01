import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StaffListComponent } from './staff-list/staff-list.component';
import { SchoolServiceContainerPageComponent } from '@ksp/school-service/feature/container-page';

export const routes: Routes = [
  {
    path: '',
    component: SchoolServiceContainerPageComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: StaffListComponent },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [StaffListComponent],
  exports: [StaffListComponent],
})
export class SchoolServiceFeatureStaffManagementModule {}
