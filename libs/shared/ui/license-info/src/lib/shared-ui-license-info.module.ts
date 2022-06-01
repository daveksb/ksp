import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenseInfoComponent } from './license-info/license-info.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LicenseInfoComponent],
  exports: [LicenseInfoComponent],
})
export class SharedUiLicenseInfoModule {}
