import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRegisterCoordinatorInfoComponent } from './form-register-coordinator-info/form-register-coordinator-info.component';
import { FormRegisterRequesterInfoComponent } from './form-register-requester-info/form-register-requester-info.component';
import { FormRegisterFileUploadComponent } from './form-register-file-upload/form-register-file-upload.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FormRegisterCoordinatorInfoComponent,
    FormRegisterRequesterInfoComponent,
    FormRegisterFileUploadComponent,
  ],
  exports: [
    FormRegisterCoordinatorInfoComponent,
    FormRegisterRequesterInfoComponent,
    FormRegisterFileUploadComponent,
  ],
})
export class UniServiceUiFormsModule {}
