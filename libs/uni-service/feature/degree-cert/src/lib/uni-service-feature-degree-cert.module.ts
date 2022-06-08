import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UniServiceContainerPageComponent } from '@ksp/uni-service/feature/container-page';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { StepThreeComponent } from './step-three/step-three.component';
import { StepFourComponent } from './step-four/step-four.component';
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';
import {
  DegreeCertHomeComponent,
  SharedFeatureDegreeCertModule,
} from '@ksp/shared/feature/degree-cert';
import { UniServiceUiFormsModule } from '@ksp/uni-service/ui/forms';

const routes: Routes = [
  {
    path: '',
    component: UniServiceContainerPageComponent,
    children: [
      {
        path: 'list',
        component: DegreeCertHomeComponent,
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
      {
        path: '**',
        component: DegreeCertHomeComponent,
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
  ],
  declarations: [
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
  ],
})
export class UniServiceFeatureDegreeCertModule {}
