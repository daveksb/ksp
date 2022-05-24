import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LicenseListComponent } from './license-list/license-list.component';
import { LicenseDetailComponent } from './license-detail/license-detail.component';
import { SchoolServiceFeatureTempLicenseRoutingModule } from './school-service-feature-temp-license-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedUiFormModule } from '@ksp/shared/ui/form';
import { MatMenuModule } from '@angular/material/menu';
import { LicenseForeignComponent } from './license-foreign/license-foreign.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SchoolServiceFeatureTempLicenseRoutingModule,
    MatTabsModule,
    SharedUiFormModule,
    MatMenuModule,
  ],
  declarations: [
    LicenseListComponent,
    LicenseDetailComponent,
    LicenseForeignComponent,
  ],
  exports: [
    LicenseListComponent,
    LicenseDetailComponent,
    LicenseForeignComponent,
  ],
})
export class SchoolServiceFeatureTempLicenseModule {}
