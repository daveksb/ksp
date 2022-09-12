import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QualificationDetailComponent } from './qualification-detail/qualification-detail.component';
import { BottomNavComponent, TopNavComponent } from '@ksp/shared/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { MatTabsModule } from '@angular/material/tabs';
import { SchoolContainerPageComponent } from '@ksp/school-service/feature/container-page';
import { Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    component: SchoolContainerPageComponent,
    children: [
      {
        path: 'detail',
        component: QualificationDetailComponent,
      },
      {
        path: 'detail/:id',
        component: QualificationDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TopNavComponent,
    ReactiveFormsModule,
    RequestHeaderInfoComponent,
    SharedFormOthersModule,
    MatTabsModule,
    BottomNavComponent,
  ],
  declarations: [QualificationDetailComponent],
  exports: [QualificationDetailComponent],
})
export class SchoolServiceFeatureQualificationApproveModule {}
