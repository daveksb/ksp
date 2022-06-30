import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRegisterCoordinatorInfoComponent } from './form-register-coordinator/form-register-coordinator.component';
import { FormRegisterRequesterInfoComponent } from './form-register-requester/form-register-requester.component';
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
