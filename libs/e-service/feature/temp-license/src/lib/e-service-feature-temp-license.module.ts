import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TempLicenseListComponent } from './temp-license-list/temp-license-list.component';
import { TempLicenseDetailComponent } from './temp-license-detail/temp-license-detail.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedUiFormModule } from '@ksp/shared/ui/form';

@NgModule({
  imports: [CommonModule, MatTabsModule, SharedUiFormModule],
  declarations: [TempLicenseListComponent, TempLicenseDetailComponent],
  exports: [TempLicenseListComponent, TempLicenseDetailComponent],
})
export class EServiceFeatureTempLicenseModule {}
