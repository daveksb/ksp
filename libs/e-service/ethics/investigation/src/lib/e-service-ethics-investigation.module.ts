import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { InvestigationDetailComponent } from './investigation-detail/investigation-detail.component';
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';
import { ListPageComponent } from '@ksp/e-service/ethics/list-page';

export const routes: Routes = [
  {
    path: '', // สืบสวน
    component: EServiceContainerPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ListPageComponent,
      },
      {
        path: 'detail',
        component: InvestigationDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedUiBottomMenuModule,
    RouterModule.forChild(routes),
  ],
  declarations: [InvestigationDetailComponent],
  exports: [InvestigationDetailComponent],
})
export class EServiceEthicsInvestigationModule {}
