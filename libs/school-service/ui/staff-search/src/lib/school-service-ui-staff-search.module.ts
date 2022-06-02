import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffSearchComponent } from './staff-search/staff-search.component';

@NgModule({
  imports: [CommonModule],
  declarations: [StaffSearchComponent],
  exports: [StaffSearchComponent],
})
export class SchoolServiceUiStaffSearchModule {}
