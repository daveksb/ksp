import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { PageNotFoundComponent } from '@ksp/shared/ui/page-not-found';
import { InvestigationDetailComponent } from './investigation-detail/investigation-detail.component';

export const routes: Routes = [
  {
    path: 'investigation', // สืบสวน
    component: EServiceContainerPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: PageNotFoundComponent,
      },
      {
        path: 'detail',
        component: PageNotFoundComponent,
      },
      
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [InvestigationDetailComponent],
  exports: [InvestigationDetailComponent],
})
export class EServiceEthicsInvestigationModule {}
