import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BottomNavComponent } from '@ksp/shared/menu';
import { SharedDegreeCertModule } from '@ksp/shared/degree-cert';
import { UniServiceFormModule } from '@ksp/uni-service/form';
import { DegreeCertRequestComponent } from './request/degree-cert-request.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedFormDegreeCertStepThreeModule } from '@ksp/shared/form/degree-cert/step-three';
import { SharedFormDegreeCertStepOneModule } from '@ksp/shared/form/degree-cert/step-one';
import { RequestHeaderInfoComponent, UniFormBadgeComponent } from '@ksp/shared/ui';
import { MatIconModule } from '@angular/material/icon';
import { TopNavComponent } from '@ksp/shared/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { UniContainerPageComponent } from '@ksp/uni-service/pages';
import { UniDegreeCertListComponent } from './list/uni-degree-cert-list.component';

const routes: Routes = [
  {
    path: '',
    component: UniContainerPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: UniDegreeCertListComponent,
      },
      {
        path: 'request',
        component: DegreeCertRequestComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BottomNavComponent,
    SharedDegreeCertModule,
    SharedFormDegreeCertStepOneModule,
    SharedFormDegreeCertStepThreeModule,
    UniServiceFormModule,
    MatStepperModule,
    MatTabsModule,
    RequestHeaderInfoComponent,
    MatIconModule,
    TopNavComponent,
    ReactiveFormsModule,
    UniFormBadgeComponent
  ],
  declarations: [DegreeCertRequestComponent],
})
export class UniServiceFeatureDegreeCertModule {}
