import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@ksp/shared/ui/page-not-found';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';

export const routes: Routes = [
  {
    path: 'temp',
    component: EServiceContainerPageComponent,
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent,
  },
  {
    path: '',
    redirectTo: 'temp',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [],
  exports: [],
})
export class EServiceDomainELicenseModule {}
