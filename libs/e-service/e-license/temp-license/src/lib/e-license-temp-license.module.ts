import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TempLicenseListComponent } from './temp-license-list/temp-license-list.component';
import { TempLicenseDetailComponent } from './temp-license-detail/temp-license-detail.component';
import { MatTabsModule } from '@angular/material/tabs';
import { EServiceUiLicenseCheckModule } from '@ksp/e-service/ui/license-check';
import { TempLicenseCheckForbiddenComponent } from './temp-license-check-forbidden/temp-license-check-forbidden.component';
import { TempLicenseCheckConfirmComponent } from './temp-license-check-confirm/temp-license-check-confirm.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TempLicenseApproveComponent } from './temp-license-approve/temp-license-approve.component';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { BottomNavComponent } from '@ksp/shared/menu';
import { ELicenseTempLicenseRoutingModule } from './e-license-temp-license-routing.module';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { TopNavComponent } from '@ksp/shared/menu';

@NgModule({
  imports: [
    CommonModule,
    ELicenseTempLicenseRoutingModule,
    MatTabsModule,
    MatDialogModule,
    SharedFormOthersModule,
    EServiceUiLicenseCheckModule,
    BottomNavComponent,
    RequestHeaderInfoComponent,
    TopNavComponent,
    MatTableModule,
    MatIconModule,
  ],
  declarations: [
    TempLicenseListComponent,
    TempLicenseDetailComponent,
    TempLicenseCheckForbiddenComponent,
    TempLicenseCheckConfirmComponent,
    TempLicenseApproveComponent,
  ],
  exports: [
    TempLicenseCheckForbiddenComponent,
    TempLicenseCheckConfirmComponent,
    TempLicenseApproveComponent,
  ],
})
export class ELicenseTempLicenseModule {}
