import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import {
  SelfServiceFormModule,
  FormUploadImageComponent,
} from '@ksp/self-service/form';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { TopNavComponent, BottomNavComponent } from '@ksp/shared/menu';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { RenewLicenseListComponent } from './renew-license-list/renew-license-list.component';
import { EServiceRequestSearchComponent } from '@ksp/shared/search';
import { MatTableModule } from '@angular/material/table';
import { RenewLicenseDetailComponent } from './renew-license-detail/renew-license-detail.component';

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
  ],
  declarations: [RenewLicenseDetailComponent, RenewLicenseListComponent],
  exports: [RenewLicenseDetailComponent, RenewLicenseListComponent],
})
export class EServiceELicenseRenewLicenseModule {}
