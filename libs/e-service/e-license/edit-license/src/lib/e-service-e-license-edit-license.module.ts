import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditLicenseApproveListComponent } from './edit-license-approve-list/edit-license-approve-list.component';
import { EditLicenseApproveDetailComponent } from './edit-license-approve-detail/edit-license-approve-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { EditLicenseComponent } from '@ksp/shared/form/license';
import { BottomNavComponent, TopNavComponent } from '@ksp/shared/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RequestNoPipe, ThaiDatePipe } from '@ksp/shared/pipe';
import { EServiceLicenseSearchComponent } from '@ksp/shared/search';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { MatDialogModule } from '@angular/material/dialog';
import { EditLicenseApproveConfirmComponent } from './edit-license-approve-confirm/edit-license-approve-confirm.component';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { ValidateKspRequestComponent } from '@ksp/e-service/e-license/approve-ksp-request';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditLicenseConsiderListComponent } from './edit-license-consider-list/edit-license-consider-list.component';
import { EditLicenseConsiderDetailComponent } from './edit-license-consider-detail/edit-license-consider-detail.component';

export const routes: Routes = [
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
        component: EditLicenseApproveListComponent,
      },
      {
        path: 'detail',
        component: EditLicenseApproveDetailComponent,
      },
      {
        path: 'detail/:id',
        component: EditLicenseApproveDetailComponent,
      },
      {
        path: 'confirm/:id',
        component: EditLicenseApproveConfirmComponent,
      },
      {
        path: 'consider-list',
        component: EditLicenseConsiderListComponent,
      },
      {
        path: 'consider-detail',
        component: EditLicenseConsiderDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    EditLicenseComponent,
    TopNavComponent,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    ThaiDatePipe,
    EServiceLicenseSearchComponent,
    BottomNavComponent,
    LicenseCheckComponent,
    SharedFormOthersModule,
    MatDialogModule,
    RequestHeaderInfoComponent,
    ValidateKspRequestComponent,
    MatProgressSpinnerModule,
    RequestNoPipe,
  ],
  declarations: [
    EditLicenseApproveListComponent,
    EditLicenseApproveDetailComponent,
    EditLicenseApproveConfirmComponent,
    EditLicenseConsiderListComponent,
    EditLicenseConsiderDetailComponent,
  ],
  exports: [
    EditLicenseApproveListComponent,
    EditLicenseApproveDetailComponent,
    EditLicenseConsiderListComponent,
    EditLicenseConsiderDetailComponent,
  ],
})
export class EServiceELicenseEditLicenseModule {}
