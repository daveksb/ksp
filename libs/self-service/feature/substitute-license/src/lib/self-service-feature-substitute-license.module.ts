import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubstituteLicenseDetailComponent } from './substitute-license-detail/substitute-license-detail.component';
import { SelfServiceMasterPageComponent } from '@ksp/self-service/feature/master-page';
import { RouterModule, Routes } from '@angular/router';
import { TopNavComponent } from '@ksp/shared/menu';
import {
  FormUploadImageComponent,
  SelfServiceFormModule,
} from '@ksp/self-service/form';
import { MatTabsModule } from '@angular/material/tabs';
import {
  RequestStatusComponent,
  SelfServiceLicenseInfoComponent,
} from '@ksp/self-service/ui';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedFormOthersModule } from '@ksp/shared/form/others';

export const routes: Routes = [
  {
    path: '',
    component: SelfServiceMasterPageComponent,
    children: [
      {
        path: 'request',
        component: SubstituteLicenseDetailComponent,
      },
      {
        path: 'request/:id',
        component: SubstituteLicenseDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    TopNavComponent,
    SelfServiceLicenseInfoComponent,
    FormUploadImageComponent,
    MatTabsModule,
    ReactiveFormsModule,
    SharedFormOthersModule,
    SelfServiceFormModule,
    RequestStatusComponent,
    RouterModule.forChild(routes),
  ],
  declarations: [SubstituteLicenseDetailComponent],
  exports: [SubstituteLicenseDetailComponent],
})
export class SelfServiceFeatureSubstituteLicenseModule {}
