import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TempLicenseComponent } from './temp-license/temp-license.component';
import { TempLicenseListComponent } from './temp-license-list/temp-license-list.component';
import { EServiceFeatureDigitalLicenseRoutingModule } from './e-service-feature-digital-license-routing.module';

@NgModule({
  imports: [CommonModule, EServiceFeatureDigitalLicenseRoutingModule],
  declarations: [TempLicenseComponent, TempLicenseListComponent],
  exports: [TempLicenseComponent, TempLicenseListComponent],
})
export class EServiceFeatureDigitalLicenseModule {}
