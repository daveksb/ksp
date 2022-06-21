import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UniServiceContainerPageComponent } from '@ksp/uni-service/feature/container-page';
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';
import {
  DegreeCertListComponent,
  SharedFeatureDegreeCertModule,
} from '@ksp/shared/feature/degree-cert';
import { UniServiceFormModule } from '@ksp/uni-service/form';
import { DegreeCertRequestComponent } from './degree-cert-request/degree-cert-request.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedFormDegreeCertStepThreeModule } from '@ksp/shared/form/degree-cert/step-three';
import { SharedFormDegreeCertStepOneModule } from '@ksp/shared/form/degree-cert/step-one';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui/request-header-info';
import { MatIconModule } from '@angular/material/icon';
import { SharedUiTopNavModule } from '@ksp/shared/ui/top-nav';

const routes: Routes = [
  {
    path: '',
    component: UniServiceContainerPageComponent,
    children: [
      {
        path: 'request',
        component: DegreeCertRequestComponent,
      },
      {
        path: 'list',
        component: DegreeCertListComponent,
      },
      {
        path: '**',
        component: DegreeCertListComponent,
      },
    ],
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedUiBottomMenuModule,
    SharedFeatureDegreeCertModule,
    SharedFormDegreeCertStepOneModule,
    SharedFormDegreeCertStepThreeModule,
    UniServiceFormModule,
    MatStepperModule,
    MatTabsModule,
    RequestHeaderInfoComponent,
    MatIconModule,
    SharedUiTopNavModule,
  ],
  declarations: [DegreeCertRequestComponent],
})
export class UniServiceFeatureDegreeCertModule {}
