import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelfServiceRegisterComponent } from './self-service-register/self-service-register.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SelfServiceRegisterComponent],
  exports: [SelfServiceRegisterComponent],
})
export class SelfServiceFeatureRegisterModule {}
