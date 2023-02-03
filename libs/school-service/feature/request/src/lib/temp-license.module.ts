import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
import {
  RequestHeaderInfoComponent,
  UniFormBadgeComponent,
} from '@ksp/shared/ui';
import { TopNavComponent } from '@ksp/shared/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestSearchComponent } from '@ksp/shared/search';
import { SchoolTempLicenseRoutingModule } from './temp-license-routing.module';
import { SchoolRequestComponent } from './school-request/school-request.component';
import { MatSortModule } from '@angular/material/sort';
import { RequestNoPipe, ThaiDatePipe } from '@ksp/shared/pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SchoolRequestListComponent } from './school-request-list/school-request-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SchoolTempLicenseRoutingModule,
    MatTabsModule,
    MatMenuModule,
    TopNavComponent,
    MatTableModule,
    MatIconModule,
    BottomNavComponent,
    RequestHeaderInfoComponent,
    ReactiveFormsModule,
    RequestSearchComponent,
    FormTempLicenseNumberComponent,
    FormTeachingInfoManagerComponent,
    FormEducationInfoManagerComponent,
    MatPaginatorModule,
    MatSortModule,
    ThaiDatePipe,
    RequestNoPipe,
    UniFormBadgeComponent,
    MatProgressSpinnerModule,
    SharedFormOthersModule,
    MatTooltipModule
  ],
  declarations: [SchoolRequestListComponent, SchoolRequestComponent],
})
export class SchoolTempLicenseModule {}
