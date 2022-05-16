import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReqDegreeCertStepTwoTabOneComponent } from './req-degree-cert-step-two-tab-one/req-degree-cert-step-two-tab-one.component';
import { ReqDegreeCertStepTwoTabTwoComponent } from './req-degree-cert-step-two-tab-two/req-degree-cert-step-two-tab-two.component';
import { ReqDegreeCertStepThreeTabOneComponent } from './req-degree-cert-step-three-tab-one/req-degree-cert-step-three-tab-one.component';
import { ReqDegreeCertStepThreeTabTwoComponent } from './req-degree-cert-step-three-tab-two/req-degree-cert-step-three-tab-two.component';
import { ReqDegreeCertStepTwoTabThreeComponent } from './req-degree-cert-step-two-tab-three/req-degree-cert-step-two-tab-three.component';
import { ReqDegreeCertStepTwoTabFourComponent } from './req-degree-cert-step-two-tab-four/req-degree-cert-step-two-tab-four.component';
import { FormRegisterCoordinatorInfoComponent } from './form-register-coordinator-info/form-register-coordinator-info.component';
import { FormRegisterRequesterInfoComponent } from './form-register-requester-info/form-register-requester-info.component';
import { FormRegisterFileUploadComponent } from './form-register-file-upload/form-register-file-upload.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ReqDegreeCertStepTwoTabOneComponent,
    ReqDegreeCertStepTwoTabTwoComponent,
    ReqDegreeCertStepThreeTabOneComponent,
    ReqDegreeCertStepThreeTabTwoComponent,
    ReqDegreeCertStepTwoTabThreeComponent,
    ReqDegreeCertStepTwoTabFourComponent,
    FormRegisterCoordinatorInfoComponent,
    FormRegisterRequesterInfoComponent,
    FormRegisterFileUploadComponent,
  ],
  exports: [
    ReqDegreeCertStepTwoTabOneComponent,
    ReqDegreeCertStepTwoTabTwoComponent,
    ReqDegreeCertStepThreeTabOneComponent,
    ReqDegreeCertStepThreeTabTwoComponent,
    ReqDegreeCertStepTwoTabThreeComponent,
    ReqDegreeCertStepTwoTabFourComponent,
    FormRegisterCoordinatorInfoComponent,
    FormRegisterRequesterInfoComponent,
    FormRegisterFileUploadComponent,
  ],
})
export class UniServiceUiFormsModule {}
