import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';
import { ListPageComponent } from '@ksp/e-service/ethics/list-page';
import { InquiryMainComponent } from './inquiry-main/inquiry-main.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AccusationRecordComponent } from '@ksp/e-service/ethics/accusation';
import { InvestigationDetailComponent } from '@ksp/e-service/ethics/investigation';
import { MatDialogModule } from '@angular/material/dialog';
import { InquiryDetailComponent } from './inquiry-detail/inquiry-detail.component';
import { InquiryResultComponent } from './inquiry-result/inquiry-result.component';
import { SharedUiTopNavModule } from '@ksp/shared/ui/top-nav';

export const routes: Routes = [
  {
    path: '', // สอบสวน
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
        component: InquiryMainComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedUiBottomMenuModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    AccusationRecordComponent,
    InvestigationDetailComponent,
    MatDialogModule,
    InquiryDetailComponent,
    InquiryResultComponent,
    SharedUiTopNavModule

  ],
  declarations: [
    InquiryMainComponent,
  ],
  exports: [
    InquiryMainComponent,
  ],
})
export class EServiceEthicsInquiryModule {}
