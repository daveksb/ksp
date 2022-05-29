import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TempLicenseListComponent } from './temp-license-list/temp-license-list.component';
import { TempLicenseDetailComponent } from './temp-license-detail/temp-license-detail.component';
import { SharedUiFormModule } from '@ksp/shared/ui/form';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { EServiceUiLicenseCheckModule } from '@ksp/e-service/ui/license-check';
import { TempLicenseCheckForbiddenComponent } from './temp-license-check-forbidden/temp-license-check-forbidden.component';
import { TempLicenseCheckConfirmComponent } from './temp-license-check-confirm/temp-license-check-confirm.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TempLicenseApproveComponent } from './temp-license-approve/temp-license-approve.component';
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';

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
        component: TempLicenseListComponent,
      },
      {
        path: 'detail',
        component: TempLicenseDetailComponent,
      },
      {
        path: 'forbidden',
        component: TempLicenseCheckForbiddenComponent,
      },
      {
        path: 'confirm',
        component: TempLicenseCheckConfirmComponent,
      },
      {
        path: 'approve',
        component: TempLicenseApproveComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatDialogModule,
    SharedUiFormModule,
    EServiceUiLicenseCheckModule,
    RouterModule.forChild(routes),
    SharedUiBottomMenuModule
  ],
  declarations: [
    TempLicenseListComponent,
    TempLicenseDetailComponent,
    TempLicenseCheckForbiddenComponent,
    TempLicenseCheckConfirmComponent,
    TempLicenseApproveComponent,
  ],
  exports: [
    TempLicenseListComponent,
    TempLicenseDetailComponent,
    TempLicenseCheckForbiddenComponent,
    TempLicenseCheckConfirmComponent,
    TempLicenseApproveComponent,
  ],
})
export class EServiceELicenseTempLicenseModule {}
