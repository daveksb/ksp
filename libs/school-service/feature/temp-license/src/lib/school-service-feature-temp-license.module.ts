import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LicenseListComponent } from './license-list/license-list.component';
import { LicenseDetailComponent } from './license-detail/license-detail.component';
import { SchoolServiceFeatureTempLicenseRoutingModule } from './school-service-feature-temp-license-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SchoolServiceFeatureTempLicenseRoutingModule,
  ],
  declarations: [LicenseListComponent, LicenseDetailComponent],
  exports: [LicenseListComponent, LicenseDetailComponent],
})
export class SchoolServiceFeatureTempLicenseModule {}
