import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccusationSearchComponent } from '@ksp/e-service/dialog/accusation-search';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { AccusationDecisionComponent } from './accusation-decision/accusation-decision.component';
import { AccusationListComponent } from './accusation-list/accusation-list.component';
import { AccusationMainComponent } from './accusation-main/accusation-main.component';

export const routes: Routes = [
  {
    data: {
      type: 'accusation',
    },
    path: '', // กล่าวหา
    component: EServiceContainerPageComponent,
    children: [
      {
        path: 'list',
        component: AccusationListComponent,
      },
      {
        path: 'detail',
        component: AccusationMainComponent,
      },
      {
        path: 'test',
        component: AccusationSearchComponent,
      },
      {
        path: 'decision',
        component: AccusationDecisionComponent,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EServiceEthicsAccusationRoutingModule {}
