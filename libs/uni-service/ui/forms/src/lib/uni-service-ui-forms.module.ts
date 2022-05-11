import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReqDegreeCertStepTwoTabOneComponent } from './req-degree-cert-step-two-tab-one/req-degree-cert-step-two-tab-one.component';
import { ReqDegreeCertStepTwoTabTwoComponent } from './req-degree-cert-step-two-tab-two/req-degree-cert-step-two-tab-two.component';
import { ReqDegreeCertStepThreeTabOneComponent } from './req-degree-cert-step-three-tab-one/req-degree-cert-step-three-tab-one.component';
import { ReqDegreeCertStepThreeTabTwoComponent } from './req-degree-cert-step-three-tab-two/req-degree-cert-step-three-tab-two.component';
import { ReqDegreeCertStepTwoTabThreeComponent } from './req-degree-cert-step-two-tab-three/req-degree-cert-step-two-tab-three.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ReqDegreeCertStepTwoTabOneComponent,
    ReqDegreeCertStepTwoTabTwoComponent,
    ReqDegreeCertStepThreeTabOneComponent,
    ReqDegreeCertStepThreeTabTwoComponent,
    ReqDegreeCertStepTwoTabThreeComponent,
  ],
  exports: [
    ReqDegreeCertStepTwoTabOneComponent,
    ReqDegreeCertStepTwoTabTwoComponent,
    ReqDegreeCertStepThreeTabOneComponent,
    ReqDegreeCertStepThreeTabTwoComponent,
    ReqDegreeCertStepTwoTabThreeComponent,
  ],
})
export class UniServiceUiFormsModule {}
