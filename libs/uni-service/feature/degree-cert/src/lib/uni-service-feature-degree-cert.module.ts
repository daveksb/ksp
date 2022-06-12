import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UniServiceContainerPageComponent } from '@ksp/uni-service/feature/container-page';
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';
import {
  DegreeCertListComponent,
  SharedFeatureDegreeCertModule,
} from '@ksp/shared/feature/degree-cert';
import { UniServiceUiFormsModule } from '@ksp/uni-service/ui/forms';
import { HomeComponent } from './home/home.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedFormDegreeCertStepThreeModule } from '@ksp/shared/form/degree-cert-step-three';

const routes: Routes = [
  {
    path: '',
    component: UniServiceContainerPageComponent,
    children: [
      {
        path: 'list',
        component: DegreeCertListComponent,
      },
      {
        path: 'request',
        component: HomeComponent,
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
    UniServiceUiFormsModule,
    MatStepperModule,
    MatTabsModule,
    SharedFormDegreeCertStepThreeModule,
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class UniServiceFeatureDegreeCertModule {}
