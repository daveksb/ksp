import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonInfoComponent } from './person-info/person-info.component';
import { LicenseInfoComponent } from './license-info/license-info.component';
import { AddressInfoComponent } from './address-info/address-info.component';
import { WorkplaceInfoComponent } from './workplace-info/workplace-info.component';
import { SharedUiLicenseInfoModule } from '@ksp/shared/ui/license-info';

@NgModule({
  imports: [CommonModule, SharedUiLicenseInfoModule],
  declarations: [
    PersonInfoComponent,
    LicenseInfoComponent,
    AddressInfoComponent,
    WorkplaceInfoComponent,
  ],
  exports: [
    PersonInfoComponent,
    LicenseInfoComponent,
    AddressInfoComponent,
    WorkplaceInfoComponent,
  ],
})
export class EServiceUiAccusationInfoModule {}
