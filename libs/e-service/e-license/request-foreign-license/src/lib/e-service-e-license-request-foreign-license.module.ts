import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { BottomNavComponent, TopNavComponent } from '@ksp/shared/menu';
import {
  FormUploadImageComponent,
  SelfServiceFormModule,
} from '@ksp/self-service/form';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import {
  LicenseCheckComponent,
  RequestLicenseApproveSummaryTableComponent,
} from '@ksp/e-service/ui/license-check';

import {
  EServiceLicenseCreateGroupSearchComponent,
  EServiceLicenseGroupSearchComponent,
  EServiceLicenseSaveResultComponent,
  EServiceLicenseSearchComponent,
  EServiceRequestSearchComponent,
  RequestSearchComponent,
} from '@ksp/shared/search';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RequestNoPipe, ThaiDatePipe } from '@ksp/shared/pipe';
import {
  ConsiderKspRequestComponent,
  ValidateKspRequestComponent,
} from '@ksp/e-service/e-license/approve-ksp-request';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RequestLicenseForeignListComponent } from './request-license-foreign-list/request-license-foreign-list.component';
import { RequestLicenseForeignDetailComponent } from './request-license-foreign-detail/request-license-foreign-detail.component';
import { RequestStatusComponent } from '@ksp/self-service/ui';
import { MatStepperModule } from '@angular/material/stepper';
import { RequestLicenseForeignConfirmComponent } from './request-license-foreign-confirm/request-license-foreign-confirm.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export const routes: Route[] = [
  {
    path: '',
    component: EServiceContainerPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: RequestLicenseForeignListComponent,
      },
      {
        path: 'detail/:id',
        component: RequestLicenseForeignDetailComponent,
      },
      {
        path: 'confirm/:id',
        component: RequestLicenseForeignConfirmComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TopNavComponent,
    SelfServiceFormModule,
    SharedFormOthersModule,
    MatTabsModule,
    FormUploadImageComponent,
    ReactiveFormsModule,
    BottomNavComponent,
    LicenseCheckComponent,
    RequestHeaderInfoComponent,
    EServiceRequestSearchComponent,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    RequestSearchComponent,
    ThaiDatePipe,
    EServiceLicenseSearchComponent,
    ValidateKspRequestComponent,
    ConsiderKspRequestComponent,
    EServiceLicenseGroupSearchComponent,
    EServiceLicenseCreateGroupSearchComponent,
    EServiceLicenseSaveResultComponent,
    RequestLicenseApproveSummaryTableComponent,
    MatCheckboxModule,
    RequestStatusComponent,
    MatStepperModule,
    ThaiDatePipe,
    RequestNoPipe,
    MatProgressSpinnerModule,
  ],
  declarations: [
    RequestLicenseForeignListComponent,
    RequestLicenseForeignDetailComponent,
    RequestLicenseForeignConfirmComponent,
  ],
})
export class EServiceELicenseRequestForeignLicenseModule {}
