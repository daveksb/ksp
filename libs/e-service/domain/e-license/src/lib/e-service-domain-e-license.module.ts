import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';

export const routes: Route[] = [
  {
    path: 'temp',
    component: EServiceContainerPageComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EServiceDomainELicenseModule {}
