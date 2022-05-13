import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelfServiceRegisterStepOneComponent } from './self-service-register-step-one/self-service-register-step-one.component';
import { SelfServiceRegisterStepTwoComponent } from './self-service-register-step-two/self-service-register-step-two.component';
import { SelfServiceRegisterStepThreeComponent } from './self-service-register-step-three/self-service-register-step-three.component';
import { SelfServiceUiFormsModule } from '@ksp/self-service/ui/forms';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [CommonModule, MatDialogModule, SelfServiceUiFormsModule],
  declarations: [
    SelfServiceRegisterStepOneComponent,
    SelfServiceRegisterStepTwoComponent,
    SelfServiceRegisterStepThreeComponent,
  ],
  exports: [
    SelfServiceRegisterStepOneComponent,
    SelfServiceRegisterStepTwoComponent,
    SelfServiceRegisterStepThreeComponent,
  ],
})
export class SelfServiceFeatureRegisterModule {}
