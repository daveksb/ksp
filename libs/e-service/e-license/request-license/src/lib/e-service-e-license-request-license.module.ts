import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestLicenseApproveListComponent } from './request-license-approve-list/request-license-approve-list.component';
import { Route, RouterModule } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import {
  FormUploadImageComponent,
  SelfServiceFormModule,
} from '@ksp/self-service/form';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { TopNavComponent, BottomNavComponent } from '@ksp/shared/menu';
import {
  EServiceLicenseGroupSearchComponent,
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
  ],
  declarations: [
    RequestLicenseApproveListComponent,
    RequestLicenseApproveDetailComponent,
    RequestLicenseApproveConfirmComponent,
    RequestLicenseApproveCreateGroupComponent,
    RequestLicenseApproveSearchListComponent,
  ],
})
export class EServiceELicenseRequestLicenseModule {}
