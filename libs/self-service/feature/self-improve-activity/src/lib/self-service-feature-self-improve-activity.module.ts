import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelfImproveActivityDetailComponent } from './self-improve-activity-detail/self-improve-activity-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { SelfServiceMasterPageComponent } from '@ksp/self-service/feature/master-page';
import { TopNavComponent } from '@ksp/shared/menu';
import { LicenseInfoComponent } from '@ksp/shared/ui';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicComponentDirective } from '@ksp/shared/directive';
import { SharedFormOthersModule } from '@ksp/shared/form/others';

export const routes: Routes = [
  {
    path: '',
    component: SelfServiceMasterPageComponent,
    children: [
      {
        path: 'request',
        component: SelfImproveActivityDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    TopNavComponent,
    LicenseInfoComponent,
    ReactiveFormsModule,
    DynamicComponentDirective,
    SharedFormOthersModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SelfImproveActivityDetailComponent],
  exports: [SelfImproveActivityDetailComponent],
})
export class SelfServiceFeatureSelfImproveActivityModule {}
