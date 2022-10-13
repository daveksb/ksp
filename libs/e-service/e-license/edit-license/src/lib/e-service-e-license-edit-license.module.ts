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
import { ThaiDatePipe } from '@ksp/shared/pipe';
import { EServiceLicenseSearchComponent } from '@ksp/shared/search';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';

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
  ],
  declarations: [
    EditLicenseApproveListComponent,
    EditLicenseApproveDetailComponent,
  ],
  exports: [EditLicenseApproveListComponent, EditLicenseApproveDetailComponent],
})
export class EServiceELicenseEditLicenseModule {}
