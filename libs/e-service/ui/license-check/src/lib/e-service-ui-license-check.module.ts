import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenseCheckComponent } from './license-check/license-check.component';
import { FinalResultInfoComponent } from './final-result-info/final-result-info.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LicenseCheckComponent, FinalResultInfoComponent],
  exports: [LicenseCheckComponent, FinalResultInfoComponent],
})
export class EServiceUiLicenseCheckModule {}
