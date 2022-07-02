import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublishReviewComponent } from './publish-review/publish-review.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AccusationRecordComponent } from '@ksp/e-service/ethics/accusation';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { MatDialogModule } from '@angular/material/dialog';
import {
  InquiryDetailComponent,
  InquiryResultComponent,
} from '@ksp/e-service/ethics/inquiry';
import { BottomNavComponent } from '@ksp/shared/menu';
import { TopNavComponent } from '@ksp/shared/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { FormInvestigationDetailComponent } from '@ksp/e-service/form';
import { PublishListComponent } from './publish-list/publish-list.component';

export const routes: Routes = [
  {
    path: '', // กล่าวหา
    component: EServiceContainerPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: PublishListComponent,
      },
      {
        path: 'detail',
        component: PublishReviewComponent,
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
    InquiryDetailComponent,
    InquiryResultComponent,
    BottomNavComponent,
    TopNavComponent,
    ReactiveFormsModule,
    FormInvestigationDetailComponent,
  ],

  declarations: [PublishReviewComponent],
  exports: [PublishReviewComponent],
})
export class EServiceEthicsPublishModule {}
