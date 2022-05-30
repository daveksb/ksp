import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccusationSearchComponent } from '@ksp/e-service/dialog/accusation-search';
import { InquiryDetailComponent } from '@ksp/e-service/ethics/inquiry';
import { InvestigationDetailComponent } from '@ksp/e-service/ethics/investigation';
import { PublishReviewComponent } from '@ksp/e-service/ethics/publish';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { AccusationDecisionComponent } from './accusation-decision/accusation-decision.component';
import { AccusationListComponent } from './accusation-list/accusation-list.component';
import { AccusationRecordComponent } from './accusation-record/accusation-record.component';

export const routes: Routes = [
  {
    path: 'accusation', // กล่าวหา
    component: EServiceContainerPageComponent,
    children: [
      {
        path: 'list',
        component: AccusationListComponent,
      },
      {
        path: 'detail',
        component: AccusationRecordComponent,
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
  {
    path: 'investigation', // สืบสวน
    component: EServiceContainerPageComponent,
    children: [
      {
        path: 'list',
        component: AccusationListComponent,
      },
      {
        path: 'detail',
        component: InvestigationDetailComponent,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'inquiry', // สอบสวน
    component: EServiceContainerPageComponent,
    children: [
      {
        path: 'list',
        component: AccusationListComponent,
      },
      {
        path: 'detail',
        component: InquiryDetailComponent,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'publish', // ตรวจสอบและเผยแพร่
    component: EServiceContainerPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: AccusationListComponent,
      },
      {
        path: 'detail',
        component: PublishReviewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EServiceEthicsAccusationRoutingModule {}
