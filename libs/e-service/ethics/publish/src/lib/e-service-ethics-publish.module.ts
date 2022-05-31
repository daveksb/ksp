import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublishReviewComponent } from './publish-review/publish-review.component';
import { MatTabsModule } from '@angular/material/tabs';
import { EServiceEthicsInquiryModule } from '@ksp/e-service/ethics/inquiry';
import { EServiceEthicsInvestigationModule } from '@ksp/e-service/ethics/investigation';
import {
  AccusationListComponent,
  EServiceEthicsAccusationModule,
} from '@ksp/e-service/ethics/accusation';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';

export const routes: Routes = [
  {
    path: '', // กล่าวหา
    component: EServiceContainerPageComponent,
    children: [
      {
        path: 'list',
        component: AccusationListComponent,
      },
      {
        path: 'detail',
        component: PublishReviewComponent,
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
  imports: [
    CommonModule,
    MatTabsModule,
    EServiceEthicsInquiryModule,
    EServiceEthicsInvestigationModule,
    EServiceEthicsAccusationModule,
    RouterModule.forChild(routes)
  ],

  declarations: [PublishReviewComponent],
  exports: [PublishReviewComponent],
})
export class EServiceEthicsPublishModule {}
