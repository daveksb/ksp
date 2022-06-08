import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRegisterCoordinatorInfoComponent } from './register-coordinator-info/register-coordinator-info.component';
import { FormRegisterRequesterInfoComponent } from './register-requester-info/register-requester-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DegreeCertCoordinatorComponent } from './degree-cert-coordinator/degree-cert-coordinator.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    FormRegisterCoordinatorInfoComponent,
    FormRegisterRequesterInfoComponent,
    DegreeCertCoordinatorComponent,
  ],
  exports: [
    FormRegisterCoordinatorInfoComponent,
    FormRegisterRequesterInfoComponent,
    DegreeCertCoordinatorComponent,
  ],
})
export class UniServiceUiFormsModule {}
