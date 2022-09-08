import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SchoolTempLicenseListComponent } from './temp-license-list/temp-license-list.component';
import { TempLicenseRequestComponent } from './temp-license-request/temp-license-request.component';
import { MatTabsModule } from '@angular/material/tabs';
import {
  FormEducationInfoManagerComponent,
  FormTeachingInfoManagerComponent,
  FormTempLicenseNumberComponent,
  SharedFormOthersModule,
} from '@ksp/shared/form/others';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { BottomNavComponent } from '@ksp/shared/menu';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { TopNavComponent } from '@ksp/shared/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { TempLicenseSearchComponent } from '@ksp/shared/search';
import { SchoolTempLicenseRoutingModule } from './temp-license-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SchoolTempLicenseRoutingModule,
    MatTabsModule,
    SharedFormOthersModule,
    MatMenuModule,
    TopNavComponent,
    MatTableModule,
    MatIconModule,
    BottomNavComponent,
    RequestHeaderInfoComponent,
    ReactiveFormsModule,
    TempLicenseSearchComponent,
    FormTempLicenseNumberComponent,
    FormTeachingInfoManagerComponent,
    FormEducationInfoManagerComponent,
  ],
  declarations: [SchoolTempLicenseListComponent, TempLicenseRequestComponent],
})
export class SchoolTempLicenseModule {}
