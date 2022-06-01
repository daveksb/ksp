import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StaffListComponent } from './staff-list/staff-list.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
  declarations: [StaffListComponent],
  exports: [StaffListComponent],
})
export class SchoolServiceFeatureStaffManagementModule {}
