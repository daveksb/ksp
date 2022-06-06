import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ForeignIdComponent } from './foreign-id/foreign-id.component';
import { SharedUiTopNavModule } from '@ksp/shared/ui/top-nav';
import { SharedUiFormModule } from '@ksp/shared/ui/form';
import { SchoolServiceContainerPageComponent } from '@ksp/school-service/feature/container-page';
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';

export const routes: Route[] = [
  {
    path: '',
    component: SchoolServiceContainerPageComponent,
    children: [
      {
        path: '',
        component: ForeignIdComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedUiTopNavModule,
    SharedUiFormModule,
    SharedUiBottomMenuModule,
  ],
  declarations: [ForeignIdComponent],
  exports: [ForeignIdComponent],
})
export class SchoolServiceFeatureForeignIdModule {}
