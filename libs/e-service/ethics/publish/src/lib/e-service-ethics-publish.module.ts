import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublishReviewComponent } from './publish-review/publish-review.component';
import { MatTabsModule } from '@angular/material/tabs';
import { InvestigationDetailComponent } from '@ksp/e-service/ethics/investigation';
import { AccusationRecordComponent } from '@ksp/e-service/ethics/accusation';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { ListPageComponent } from '@ksp/e-service/ethics/list-page';
import { MatDialogModule } from '@angular/material/dialog';
import {
  InquiryDetailComponent,
  InquiryResultComponent,
} from '@ksp/e-service/ethics/inquiry';

export const routes: Routes = [
  {
    path: '', // กล่าวหา
    component: EServiceContainerPageComponent,
    children: [
      {
        path: 'list',
        component: ListPageComponent,
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
    MatDialogModule,
    RouterModule.forChild(routes),
    AccusationRecordComponent,
    InvestigationDetailComponent,
    InquiryDetailComponent,
    InquiryResultComponent,
  ],

  declarations: [PublishReviewComponent],
  exports: [PublishReviewComponent],
})
export class EServiceEthicsPublishModule {}
