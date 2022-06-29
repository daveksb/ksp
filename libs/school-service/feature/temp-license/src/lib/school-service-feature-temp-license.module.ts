import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SchoolTempLicenseListComponent } from './school-temp-license-list/school-temp-license-list.component';
import { SchoolTempLicenseDetailComponent } from './school-temp-license-detail/school-temp-license-detail.component';
import { SchoolServiceFeatureTempLicenseRoutingModule } from './school-service-feature-temp-license-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { BottomNavComponent } from '@ksp/shared/menu';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { TopNavComponent } from '@ksp/shared/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { TempLicenseSearchComponent } from '@ksp/shared/form/search';

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
    BottomNavComponent,
    RequestHeaderInfoComponent,
    ReactiveFormsModule,
    TempLicenseSearchComponent,
  ],
  declarations: [
    SchoolTempLicenseListComponent,
    SchoolTempLicenseDetailComponent,
  ],
})
export class SchoolServiceFeatureTempLicenseModule {}
