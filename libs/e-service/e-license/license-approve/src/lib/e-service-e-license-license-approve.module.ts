import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenseApproveDetailComponent } from './license-approve-detail/license-approve-detail.component';
import { MatTabsModule } from '@angular/material/tabs';
import {
  SelfServiceFormModule,
  FormUploadImageComponent,
} from '@ksp/self-service/form';
import { BottomNavComponent, TopNavComponent } from '@ksp/shared/menu';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { LicenseApproveListComponent } from './license-approve-list/license-approve-list.component';
import { MatTableModule } from '@angular/material/table';
import { EServiceRequestSearchComponent, RequestSearchComponent } from '@ksp/shared/search';

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
        component: LicenseApproveListComponent,
      },
      {
        path: 'approve-detail',
        component: LicenseApproveDetailComponent,
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
    MatTableModule,
    EServiceRequestSearchComponent,
  ],
  declarations: [LicenseApproveDetailComponent, LicenseApproveListComponent],
  exports: [LicenseApproveDetailComponent, LicenseApproveListComponent],
})
export class EServiceELicenseLicenseApproveModule {}
