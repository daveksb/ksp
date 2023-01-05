import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubstituteLicenseListComponent } from './substitute-license-list/substitute-license-list.component';
import { SubstituteLicenseDetailComponent } from './substitute-license-detail/substitute-license-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Route, RouterModule } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import {
  FormUploadImageComponent,
  SelfServiceFormModule,
} from '@ksp/self-service/form';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { TopNavComponent, BottomNavComponent } from '@ksp/shared/menu';
import { RequestNoPipe, ThaiDatePipe } from '@ksp/shared/pipe';
import { EServiceLicenseSearchComponent } from '@ksp/shared/search';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { SubstitueLicenseConfirmComponent } from './substitue-license-confirm/substitue-license-confirm.component';
import { ValidateKspRequestComponent } from '@ksp/e-service/e-license/approve-ksp-request';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SubstituteLicenseConsiderListComponent } from './substitute-license-consider-list/substitute-license-consider-list.component';
import { SubstituteLicenseConsiderDetailComponent } from './substitute-license-consider-detail/substitute-license-consider-detail.component';

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
        component: SubstituteLicenseListComponent,
      },
      {
        path: 'approve-detail',
        component: SubstituteLicenseDetailComponent,
      },
      {
        path: 'approve-detail/:id',
        component: SubstituteLicenseDetailComponent,
      },
      {
        path: 'approve-confirm/:id',
        component: SubstitueLicenseConfirmComponent,
      },
      {
        path: 'consider-list',
        component: SubstituteLicenseConsiderListComponent,
      },
      {
        path: 'consider-detail',
        component: SubstituteLicenseConsiderDetailComponent,
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
    ValidateKspRequestComponent,
    MatProgressSpinnerModule,
    RequestNoPipe,
  ],
  declarations: [
    SubstituteLicenseListComponent,
    SubstituteLicenseDetailComponent,
    SubstitueLicenseConfirmComponent,
    SubstituteLicenseConsiderListComponent,
    SubstituteLicenseConsiderDetailComponent,
  ],
  exports: [
    SubstituteLicenseListComponent,
    SubstituteLicenseDetailComponent,
    SubstituteLicenseConsiderListComponent,
    SubstituteLicenseConsiderDetailComponent,
  ],
})
export class EServiceELicenseSubstituteLicenseModule {}
