import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import {
  LicenseCheckComponent,
  RequestLicenseApproveSummaryTableComponent,
} from '@ksp/e-service/ui/license-check';
import {
  FormUploadImageComponent,
  SelfServiceFormModule,
} from '@ksp/self-service/form';
import {
  ForbiddenPropertyFormComponent,
  SharedFormOthersModule,
} from '@ksp/shared/form/others';
import { TopNavComponent, BottomNavComponent } from '@ksp/shared/menu';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { RenewLicenseListComponent } from './renew-license-list/renew-license-list.component';
import {
  EServiceLicenseCreateGroupSearchComponent,
  EServiceLicenseGroupSearchComponent,
  EServiceLicenseSaveResultComponent,
  EServiceLicenseSearchComponent,
  EServiceRequestSearchComponent,
  RequestSearchComponent,
} from '@ksp/shared/search';
import { MatTableModule } from '@angular/material/table';
import { RenewLicenseDetailComponent } from './renew-license-detail/renew-license-detail.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RequestNoPipe, ThaiDatePipe } from '@ksp/shared/pipe';
import { RenewLicenseConfirmComponent } from './renew-license-confirm/renew-license-confirm.component';
import { ValidateKspRequestComponent } from '@ksp/e-service/e-license/approve-ksp-request';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RenewLicenseSearchListComponent } from './renew-license-search-list/renew-license-search-list.component';
import { RenewLicenseCreateGroupListComponent } from './renew-license-create-group-list/renew-license-create-group-list.component';
import { RenewLicenseGuarunteeConfirmComponent } from './renew-license-guaruntee-confirm/renew-license-guaruntee-confirm.component';
import { RenewLicensePrintComponent } from './renew-license-print/renew-license-print.component';
import { RenewLicenseSaveResultComponent } from './renew-license-save-result/renew-license-save-result.component';
import { RenewLicenseKmvComponent } from './renew-license-kmv/renew-license-kmv.component';
import { RenewLicenseCreateGroupComponent } from './renew-license-create-group/renew-license-create-group.component';
import { RequestLicenseApproveLicenseTableComponent } from '@ksp/e-service/e-license/request-license';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
        path: 'approve-list',
        component: RenewLicenseListComponent,
      },
      {
        path: 'approve-detail',
        component: RenewLicenseDetailComponent,
      },
      {
        path: 'approve-detail/:id',
        component: RenewLicenseDetailComponent,
      },
      {
        path: 'approve-confirm/:id',
        component: RenewLicenseConfirmComponent,
      },
      {
        path: 'search-list',
        component: RenewLicenseSearchListComponent,
      },
      {
        path: 'guarantee',
        component: RenewLicenseSearchListComponent,
      },
      {
        path: 'create-group-list',
        component: RenewLicenseCreateGroupListComponent,
      },
      {
        path: 'guarantee-confirm',
        component: RenewLicenseGuarunteeConfirmComponent,
      },
      {
        path: 'print',
        component: RenewLicensePrintComponent,
      },
      {
        path: 'save-result',
        component: RenewLicenseSaveResultComponent,
      },
      {
        path: 'kmv',
        component: RenewLicenseKmvComponent,
      },
      {
        path: 'create-group',
        component: RenewLicenseCreateGroupComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
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
    RequestSearchComponent,
    MatPaginatorModule,
    ThaiDatePipe,
    EServiceLicenseSearchComponent,
    ValidateKspRequestComponent,
    ForbiddenPropertyFormComponent,
    RequestNoPipe,
    MatProgressSpinnerModule,
    EServiceLicenseGroupSearchComponent,
    EServiceLicenseCreateGroupSearchComponent,
    RequestLicenseApproveLicenseTableComponent,
    EServiceLicenseSaveResultComponent,
    MatCheckboxModule,
    RequestLicenseApproveSummaryTableComponent,
  ],
  declarations: [
    RenewLicenseDetailComponent,
    RenewLicenseListComponent,
    RenewLicenseConfirmComponent,
    RenewLicenseSearchListComponent,
    RenewLicenseCreateGroupListComponent,
    RenewLicenseGuarunteeConfirmComponent,
    RenewLicensePrintComponent,
    RenewLicenseSaveResultComponent,
    RenewLicenseKmvComponent,
    RenewLicenseCreateGroupComponent,
  ],
  exports: [RenewLicenseDetailComponent, RenewLicenseListComponent],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
})
export class EServiceELicenseRenewLicenseModule {}
