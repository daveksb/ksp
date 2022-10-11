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
import { ThaiDatePipe } from '@ksp/shared/pipe';
import { EServiceLicenseSearchComponent } from '@ksp/shared/search';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';

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
    SubstituteLicenseListComponent,
    SubstituteLicenseDetailComponent,
  ],
  exports: [SubstituteLicenseListComponent, SubstituteLicenseDetailComponent],
})
export class EServiceELicenseSubstituteLicenseModule {}