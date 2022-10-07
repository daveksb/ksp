import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolUserDetailComponent } from './school-user-detail/school-user-detail.component';
import { FormCoordinatorInfoComponent } from '@ksp/shared/form/school/register';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [CommonModule, FormCoordinatorInfoComponent, MatDialogModule],
  declarations: [SchoolUserDetailComponent],
  exports: [SchoolUserDetailComponent],
})
export class EServiceDialogSchoolUserDetailModule {}
