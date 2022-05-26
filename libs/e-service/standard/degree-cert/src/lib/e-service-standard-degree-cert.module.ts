import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { DegreeCertListComponent } from './degree-cert-list/degree-cert-list.component';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { SharedUiDegreeCertSearchFormModule } from '@ksp/shared/ui/degree-cert-search-form';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { StepThreeComponent } from './step-three/step-three.component';
import { StepFourComponent } from './step-four/step-four.component';
import { StepFiveComponent } from './step-five/step-five.component';
import { SharedFeatureDegreeCertModule } from '@ksp/shared-feature-degree-cert';
import { EServiceUiLicenseCheckModule } from '@ksp/e-service/ui/license-check';
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';
import { MatDialogModule } from '@angular/material/dialog';

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
        component: DegreeCertListComponent,
      },
      {
        path: 'step-1',
        component: StepOneComponent,
      },
      {
        path: 'step-2',
        component: StepTwoComponent,
      },
      {
        path: 'step-3',
        component: StepThreeComponent,
      },
      {
        path: 'step-4',
        component: StepFourComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedFeatureDegreeCertModule,
    SharedUiBottomMenuModule,
    EServiceUiLicenseCheckModule,
    SharedUiDegreeCertSearchFormModule,
    MatDialogModule
  ],
  declarations: [
    DegreeCertListComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    StepFiveComponent,
  ],
  exports: [
    DegreeCertListComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    StepFiveComponent,
  ],
})
export class EServiceStandardDegreeCertModule {}
