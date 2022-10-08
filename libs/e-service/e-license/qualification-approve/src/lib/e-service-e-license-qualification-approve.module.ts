import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QualificationApproveListComponent } from './qualification-approve-list/qualification-approve-list.component';
import { QualificationApproveDetailComponent } from './qualification-approve-detail/qualification-approve-detail.component';
import { Route, RouterModule } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { BottomNavComponent, TopNavComponent } from '@ksp/shared/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {
  EServiceRequestSearchComponent,
  RequestSearchComponent,
} from '@ksp/shared/search';
import { MatTableModule } from '@angular/material/table';
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
        path: 'list',
        component: QualificationApproveListComponent,
      },
      {
        path: 'detail',
        component: QualificationApproveDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TopNavComponent,
    MatTabsModule,
    RequestHeaderInfoComponent,
    SharedFormOthersModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatTableModule,
    EServiceRequestSearchComponent,
    LicenseCheckComponent,
    BottomNavComponent,
  ],
  declarations: [
    QualificationApproveListComponent,
    QualificationApproveDetailComponent,
  ],
  exports: [
    QualificationApproveListComponent,
    QualificationApproveDetailComponent,
  ],
})
export class EServiceELicenseQualificationApproveModule {}
