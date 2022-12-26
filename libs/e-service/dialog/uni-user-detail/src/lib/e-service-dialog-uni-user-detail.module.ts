import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniUserDetailComponent } from './uni-user-detail/uni-user-detail.component';
import { FormCoordinatorInfoComponent } from '@ksp/shared/form/school/register';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormCoordinatorInfoComponent, MatDialogModule, ReactiveFormsModule],
  declarations: [UniUserDetailComponent],
  exports: [UniUserDetailComponent],
})
export class EServiceDialogUniUserDetailModule {}
