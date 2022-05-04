import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelfServiceLicenseHomeComponent } from './self-service-license-home/self-service-license-home.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SelfServiceLicenseHomeComponent],
  exports: [SelfServiceLicenseHomeComponent],
})
export class SelfServiceFeatureLicenseModule {}
