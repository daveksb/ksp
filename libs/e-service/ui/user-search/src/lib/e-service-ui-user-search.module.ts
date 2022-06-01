import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproveUserSearchFormComponent } from './approve-user-search-form/approve-user-search-form.component';
import { ManageUserSearchFormComponent } from './manage-user-search-form/manage-user-search-form.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ApproveUserSearchFormComponent, ManageUserSearchFormComponent],
  exports: [ApproveUserSearchFormComponent, ManageUserSearchFormComponent],
})
export class EServiceUiUserSearchModule {}
