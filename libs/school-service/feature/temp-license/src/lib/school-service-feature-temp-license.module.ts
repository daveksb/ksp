import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LicenseListComponent } from './license-list/license-list.component';
import { LicenseDetailComponent } from './license-detail/license-detail.component';
import { SchoolServiceFeatureTempLicenseRoutingModule } from './school-service-feature-temp-license-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedUiFormModule } from '@ksp/shared/ui/form';
import { MatMenuModule } from '@angular/material/menu';
import { SharedUiTopNavModule } from '@ksp/shared/ui/top-nav';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SchoolServiceFeatureTempLicenseRoutingModule,
    MatTabsModule,
    SharedUiFormModule,
    MatMenuModule,
    SharedUiTopNavModule,
    MatTableModule,
    MatIconModule,
    SharedUiBottomMenuModule
  ],
  declarations: [LicenseListComponent, LicenseDetailComponent],
  exports: [LicenseListComponent, LicenseDetailComponent],
})
export class SchoolServiceFeatureTempLicenseModule {}
