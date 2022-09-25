import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelfActivityDetailComponent } from './self-activity-detail/self-activity-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { SelfServiceMasterPageComponent } from '@ksp/self-service/feature/master-page';
import { TopNavComponent } from '@ksp/shared/menu';
import { LicenseInfoComponent } from '@ksp/shared/ui';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicComponentDirective } from '@ksp/shared/directive';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { SchoolServiceFormActivityModule } from '@ksp/school-service/form/activity';

export const routes: Routes = [
  {
    path: '',
    component: SelfServiceMasterPageComponent,
    children: [
      {
        path: 'request',
        component: SelfActivityDetailComponent,
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
    SchoolServiceFormActivityModule,
  ],
  declarations: [SelfActivityDetailComponent],
  exports: [SelfActivityDetailComponent],
})
export class SelfServiceFeatureSelfActivityModule {}
