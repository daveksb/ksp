import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonInfoComponent } from './person-info/person-info.component';
import { AddressInfoComponent } from './address-info/address-info.component';
import { WorkplaceInfoComponent } from './workplace-info/workplace-info.component';
import { LicenseInfoComponent } from '@ksp/shared/ui';

@NgModule({
  imports: [CommonModule, LicenseInfoComponent],
  declarations: [
    PersonInfoComponent,
    AddressInfoComponent,
    WorkplaceInfoComponent,
  ],
  exports: [PersonInfoComponent, AddressInfoComponent, WorkplaceInfoComponent],
})
export class EServiceUiAccusationInfoModule {}
