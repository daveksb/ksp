import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReqDegreeCertHomeComponent } from './req-degree-cert-home/req-degree-cert-home.component';
import { ReqDegreeCertStepOneComponent } from './req-degree-cert-step-one/req-degree-cert-step-one.component';
import { ReqDegreeCertStepTwoComponent } from './req-degree-cert-step-two/req-degree-cert-step-two.component';
import { ReqDegreeCertStepThreeComponent } from './req-degree-cert-step-three/req-degree-cert-step-three.component';
import { ReqDegreeCertStepFourComponent } from './req-degree-cert-step-four/req-degree-cert-step-four.component';
import { ReqDegreeCertStepFiveComponent } from './req-degree-cert-step-five/req-degree-cert-step-five.component';
import { MatTabsModule } from '@angular/material/tabs';
import { UniServiceUiFormsModule } from '@ksp/uni-service/ui/forms';

@NgModule({
  imports: [CommonModule, MatTabsModule, UniServiceUiFormsModule],
  declarations: [
    ReqDegreeCertHomeComponent,
    ReqDegreeCertStepOneComponent,
    ReqDegreeCertStepTwoComponent,
    ReqDegreeCertStepThreeComponent,
    ReqDegreeCertStepFourComponent,
    ReqDegreeCertStepFiveComponent,
  ],
})
export class UniServiceFeatureReqDegreeCertModule {}
