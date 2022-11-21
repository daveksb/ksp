import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
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
  EServiceLicenseSearchComponent,
  EServiceRequestSearchComponent,
  RequestSearchComponent,
} from '@ksp/shared/search';
import { MatTableModule } from '@angular/material/table';
import { RenewLicenseDetailComponent } from './renew-license-detail/renew-license-detail.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ThaiDatePipe } from '@ksp/shared/pipe';
import { RenewLicenseConfirmComponent } from './renew-license-confirm/renew-license-confirm.component';
import { ValidateKspRequestComponent } from '@ksp/e-service/e-license/approve-ksp-request';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  ],
  declarations: [
    RenewLicenseDetailComponent,
    RenewLicenseListComponent,
    RenewLicenseConfirmComponent,
  ],
  exports: [RenewLicenseDetailComponent, RenewLicenseListComponent],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
})
export class EServiceELicenseRenewLicenseModule {}
