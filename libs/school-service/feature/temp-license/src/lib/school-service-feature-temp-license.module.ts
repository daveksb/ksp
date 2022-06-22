import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LicenseListComponent } from './license-list/license-list.component';
import { LicenseDetailComponent } from './license-detail/license-detail.component';
import { SchoolServiceFeatureTempLicenseRoutingModule } from './school-service-feature-temp-license-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { MatMenuModule } from '@angular/material/menu';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';
import { RequestHeaderInfoComponent } from '@ksp/shared/new-ui';
import { TopNavComponent } from '@ksp/shared/menu';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SchoolServiceFeatureTempLicenseRoutingModule,
    MatTabsModule,
    SharedFormOthersModule,
    MatMenuModule,
    TopNavComponent,
    MatTableModule,
    MatIconModule,
    SharedUiBottomMenuModule,
    RequestHeaderInfoComponent,
  ],
  declarations: [LicenseListComponent, LicenseDetailComponent],
  exports: [LicenseListComponent, LicenseDetailComponent],
})
export class SchoolServiceFeatureTempLicenseModule {}
