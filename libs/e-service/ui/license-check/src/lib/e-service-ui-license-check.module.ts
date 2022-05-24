import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenseCheckComponent } from './license-check/license-check.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LicenseCheckComponent],
  exports: [LicenseCheckComponent],
})
export class EServiceUiLicenseCheckModule {}
