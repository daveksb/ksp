import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRegisterCoordinatorInfoComponent } from './form-register-coordinator/form-register-coordinator.component';
import { FormRegisterRequesterInfoComponent } from './form-register-requester/form-register-requester.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    DropdownModule],
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
