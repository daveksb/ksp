import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { DegreeCertListComponent } from './degree-cert-list/degree-cert-list.component';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';

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
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [DegreeCertListComponent],
  exports: [DegreeCertListComponent],
})
export class EServiceStandardDegreeCertModule {}
