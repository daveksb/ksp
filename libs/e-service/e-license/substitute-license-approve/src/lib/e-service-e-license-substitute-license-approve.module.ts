import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubstituteLicenseApproveListComponent } from './substitute-license-approve-list/substitute-license-approve-list.component';
import { SubstituteLicenseApproveDetailComponent } from './substitute-license-approve-detail/substitute-license-approve-detail.component';
import { Route, RouterModule } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { BottomNavComponent, TopNavComponent } from '@ksp/shared/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { EServiceLicenseSearchComponent } from '@ksp/shared/search';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ThaiDatePipe } from '@ksp/shared/pipe';
import { MatTableModule } from '@angular/material/table';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import {
  FormUploadImageComponent,
  SelfServiceFormModule,
} from '@ksp/self-service/form';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';

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
        component: SubstituteLicenseApproveListComponent,
      },
      {
        path: 'approve-detail',
        component: SubstituteLicenseApproveDetailComponent,
      },
      {
        path: 'approve-detail/:id',
        component: SubstituteLicenseApproveDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TopNavComponent,
    ReactiveFormsModule,
    MatTabsModule,
    EServiceLicenseSearchComponent,
    MatPaginatorModule,
    ThaiDatePipe,
    MatTableModule,
    RequestHeaderInfoComponent,
    SharedFormOthersModule,
    FormUploadImageComponent,
    SelfServiceFormModule,
    BottomNavComponent,
    LicenseCheckComponent,
  ],
  declarations: [
    SubstituteLicenseApproveListComponent,
    SubstituteLicenseApproveDetailComponent,
  ],
  exports: [
    SubstituteLicenseApproveListComponent,
    SubstituteLicenseApproveDetailComponent,
  ],
})
export class EServiceELicenseSubstituteLicenseApproveModule {}
