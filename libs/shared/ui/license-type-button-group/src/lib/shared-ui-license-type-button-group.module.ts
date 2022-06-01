import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenseTypeButtonGroupComponent } from './license-type-button-group/license-type-button-group.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LicenseTypeButtonGroupComponent],
  exports: [LicenseTypeButtonGroupComponent],
})
export class SharedUiLicenseTypeButtonGroupModule {}
