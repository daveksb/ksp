import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestLicenseApproveListComponent } from './request-license-approve-list/request-license-approve-list.component';
import { Route, RouterModule } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import {
  LicenseCheckComponent,
  RequestLicenseApproveSummaryTableComponent,
} from '@ksp/e-service/ui/license-check';
import {
  FormUploadImageComponent,
  SelfServiceFormModule,
} from '@ksp/self-service/form';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { TopNavComponent, BottomNavComponent } from '@ksp/shared/menu';
import {
  EServiceLicenseCreateGroupSearchComponent,
  EServiceLicenseGroupSearchComponent,
  EServiceLicenseSaveResultComponent,
  EServiceLicenseSearchComponent,
  EServiceRequestSearchComponent,
  RequestSearchComponent,
} from '@ksp/shared/search';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { RequestLicenseApproveDetailComponent } from './request-license-approve-detail/request-license-approve-detail.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ThaiDatePipe } from '@ksp/shared/pipe';
import { RequestLicenseApproveConfirmComponent } from './request-license-approve-confirm/request-license-approve-confirm.component';
import {
  ConsiderKspRequestComponent,
  ValidateKspRequestComponent,
} from '@ksp/e-service/e-license/approve-ksp-request';
import { RequestLicenseApproveCreateGroupComponent } from './request-license-approve-create-group/request-license-approve-create-group.component';
import { RequestLicenseApproveSearchListComponent } from './request-license-approve-search-list/request-license-approve-search-list.component';
import { RequestLicenseApproveCreateGroupListComponent } from './request-license-approve-create-group-list/request-license-approve-create-group-list.component';
import { RequestLicenseApproveGuarunteeComponent } from './request-license-approve-guaruntee/request-license-approve-guaruntee.component';
import { RequestLicenseApproveLicenseTableComponent } from './request-license-approve-license-table/request-license-approve-license-table.component';
import { RequestLicenseApprovePrintComponent } from './request-license-approve-print/request-license-approve-print.component';
import { RequestLicenseApproveSaveResultComponent } from './request-license-approve-save-result/request-license-approve-save-result.component';
import { RequestLicenseApproveKmvComponent } from './request-license-approve-kmv/request-license-approve-kmv.component';

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
        component: RequestLicenseApproveListComponent,
      },
      {
        path: 'approve-detail',
        component: RequestLicenseApproveDetailComponent,
      },
      {
        path: 'approve-detail/:id',
        component: RequestLicenseApproveDetailComponent,
      },
      {
        path: 'approve-confirm/:id',
        component: RequestLicenseApproveConfirmComponent,
      },
      {
        path: 'create-group',
        component: RequestLicenseApproveCreateGroupComponent,
      },
      {
        path: 'search-list',
        component: RequestLicenseApproveSearchListComponent,
      },
      {
        path: 'create-group-list',
        component: RequestLicenseApproveCreateGroupListComponent,
      },
      {
        path: 'guarantee',
        component: RequestLicenseApproveSearchListComponent,
      },
      {
        path: 'guarantee-confirm',
        component: RequestLicenseApproveGuarunteeComponent,
      },
      {
        path: 'print',
        component: RequestLicenseApprovePrintComponent,
      },
      {
        path: 'save-result',
        component: RequestLicenseApproveSaveResultComponent,
      },
      {
        path: 'kmv',
        component: RequestLicenseApproveKmvComponent,
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
  ],
  declarations: [
    RequestLicenseApproveListComponent,
    RequestLicenseApproveDetailComponent,
    RequestLicenseApproveConfirmComponent,
    RequestLicenseApproveCreateGroupComponent,
    RequestLicenseApproveSearchListComponent,
    RequestLicenseApproveCreateGroupListComponent,
    RequestLicenseApproveGuarunteeComponent,
    RequestLicenseApproveLicenseTableComponent,
    RequestLicenseApprovePrintComponent,
    RequestLicenseApproveSaveResultComponent,
    RequestLicenseApproveKmvComponent,
  ],
})
export class EServiceELicenseRequestLicenseModule {}
