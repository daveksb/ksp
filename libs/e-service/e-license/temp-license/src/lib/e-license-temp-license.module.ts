import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ETempLicenseListComponent } from './e-temp-license-list/e-temp-license-list.component';
import { ETempLicenseDetailComponent } from './e-temp-license-detail/e-temp-license-detail.component';
import { MatTabsModule } from '@angular/material/tabs';
import { TempLicenseCheckForbiddenComponent } from './temp-license-check-forbidden/temp-license-check-forbidden.component';
import { TempLicenseCheckConfirmComponent } from './temp-license-check-confirm/temp-license-check-confirm.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TempLicenseApproveComponent } from './temp-license-approve/temp-license-approve.component';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { BottomNavComponent } from '@ksp/shared/menu';
import { ELicenseTempLicenseRoutingModule } from './e-license-temp-license-routing.module';
import {
  FormTempLicenseNumberComponent,
  SharedFormOthersModule,
} from '@ksp/shared/form/others';
import { TopNavComponent } from '@ksp/shared/menu';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import { RequestSearchComponent } from '@ksp/shared/search';
import { ReactiveFormsModule } from '@angular/forms';
import { TempLicenseApproveListComponent } from './temp-license-approve-list/temp-license-approve-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ThaiDatePipe } from '@ksp/shared/pipe';

@NgModule({
  imports: [
    CommonModule,
    ELicenseTempLicenseRoutingModule,
    MatTabsModule,
    MatDialogModule,
    SharedFormOthersModule,
    BottomNavComponent,
    RequestHeaderInfoComponent,
    TopNavComponent,
    MatTableModule,
    MatIconModule,
    LicenseCheckComponent,
    RequestSearchComponent,
    ReactiveFormsModule,
    FormTempLicenseNumberComponent,
    MatPaginatorModule,
    ThaiDatePipe,
  ],
  declarations: [
    ETempLicenseListComponent,
    ETempLicenseDetailComponent,
    TempLicenseCheckForbiddenComponent,
    TempLicenseCheckConfirmComponent,
    TempLicenseApproveComponent,
    TempLicenseApproveListComponent,
  ],
  exports: [
    TempLicenseCheckForbiddenComponent,
    TempLicenseCheckConfirmComponent,
    TempLicenseApproveComponent,
    TempLicenseApproveListComponent,
  ],
})
export class ELicenseTempLicenseModule {}
