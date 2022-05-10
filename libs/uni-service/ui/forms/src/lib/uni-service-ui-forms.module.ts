import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReqDegreeCertStepTwoTabOneComponent } from './req-degree-cert-step-two-tab-one/req-degree-cert-step-two-tab-one.component';
import { ReqDegreeCertStepTwoTabTwoComponent } from './req-degree-cert-step-two-tab-two/req-degree-cert-step-two-tab-two.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ReqDegreeCertStepTwoTabOneComponent,
    ReqDegreeCertStepTwoTabTwoComponent,
  ],
  exports: [
    ReqDegreeCertStepTwoTabOneComponent,
    ReqDegreeCertStepTwoTabTwoComponent,
  ],
})
export class UniServiceUiFormsModule {}
