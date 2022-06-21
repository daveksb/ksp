import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRegisterCoordinatorInfoComponent } from './register-coordinator-info/register-coordinator-info.component';
import { FormRegisterRequesterInfoComponent } from './register-requester-info/register-requester-info.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    FormRegisterCoordinatorInfoComponent,
    FormRegisterRequesterInfoComponent,
  ],
  exports: [
    FormRegisterCoordinatorInfoComponent,
    FormRegisterRequesterInfoComponent,
  ],
})
export class UniServiceFormModule {}
