import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffSearchComponent } from './staff-search/staff-search.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [StaffSearchComponent],
  exports: [StaffSearchComponent],
})
export class SchoolServiceUiStaffSearchModule {}
