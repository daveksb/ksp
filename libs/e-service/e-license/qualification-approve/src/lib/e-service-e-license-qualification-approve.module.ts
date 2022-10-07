import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QualificationApproveListComponent } from './qualification-approve-list/qualification-approve-list.component';
import { QualificationApproveDetailComponent } from './qualification-approve-detail/qualification-approve-detail.component';
import { Route, RouterModule } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { TopNavComponent } from '@ksp/shared/menu';

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
        component: QualificationApproveListComponent,
      },
      {
        path: 'detail',
        component: QualificationApproveDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), TopNavComponent],
  declarations: [
    QualificationApproveListComponent,
    QualificationApproveDetailComponent,
  ],
  exports: [
    QualificationApproveListComponent,
    QualificationApproveDetailComponent,
  ],
})
export class EServiceELicenseQualificationApproveModule {}
