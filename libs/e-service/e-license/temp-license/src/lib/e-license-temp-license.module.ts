import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ETempLicenseDetailComponent } from './temp-license-detail/temp-license-detail.component';
import { MatTabsModule } from '@angular/material/tabs';
import { TempLicenseCheckForbiddenComponent } from './temp-license-check-forbidden/temp-license-check-forbidden.component';
import { TempLicenseCheckConfirmComponent } from './temp-license-check-confirm/temp-license-check-confirm.component';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TempLicenseApproveComponent } from './temp-license-approve/temp-license-approve.component';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { BottomNavComponent } from '@ksp/shared/menu';
import { ELicenseTempLicenseRoutingModule } from './e-license-temp-license-routing.module';
import {
  FormTempLicenseNumberComponent,
  SharedFormOthersModule,
  ForbiddenPropertyFormComponent,
  FormTeachingInfoManagerComponent,
} from '@ksp/shared/form/others';
import { TopNavComponent } from '@ksp/shared/menu';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import { ReactiveFormsModule } from '@angular/forms';
import { TempLicenseApproveListComponent } from './temp-license-approve-list/temp-license-approve-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RequestNoPipe, ThaiDatePipe } from '@ksp/shared/pipe';
import { RequestSearchComponent } from '@ksp/shared/search';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSortModule } from '@angular/material/sort';
import {
  ValidateKspRequestComponent,
  ConsiderKspRequestComponent,
} from '@ksp/e-service/e-license/approve-ksp-request';
import { ETempLicenseListComponent } from './temp-license-list/temp-license-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    ELicenseTempLicenseRoutingModule,
    MatTabsModule,
    MatDialogModule,
    SharedFormOthersModule,
    BottomNavComponent,
    RequestHeaderInfoComponent,
    MatProgressSpinnerModule,
    TopNavComponent,
    MatTableModule,
    MatIconModule,
    LicenseCheckComponent,
    ReactiveFormsModule,
    FormTempLicenseNumberComponent,
    MatPaginatorModule,
    ThaiDatePipe,
    RequestSearchComponent,
    SharedFormOthersModule,
    MatDatepickerModule,
    MatSortModule,
    ValidateKspRequestComponent,
    ConsiderKspRequestComponent,
    RequestNoPipe,
    ForbiddenPropertyFormComponent,
    FormTeachingInfoManagerComponent,
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
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
})
export class ELicenseTempLicenseModule {}
