import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccusationListComponent } from './accusation-list/accusation-list.component';
import { AccusationRecordComponent } from './accusation-record/accusation-record.component';
import { EServiceUiAccusationSearchModule } from '@ksp/e-service/ui/accusation-search';
import { SharedUiFormModule } from '@ksp/shared/ui/form';
import { AccusationSearchComponent, EServiceDialogAccusationSearchModule } from '@ksp/e-service/dialog/accusation-search';

import { MatTabsModule } from '@angular/material/tabs';
import { EServiceUiAccusationInfoModule } from '@ksp/e-service/ui/accusation-info';
import { MatDialogModule } from '@angular/material/dialog';
import { InvestigationDetailComponent } from '@ksp/e-service/ethics/investigation';
import {
  InquiryDetailComponent,
  InquiryResultComponent,
} from '@ksp/e-service/ethics/inquiry';

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
        path: 'result',
        component: InquiryResultComponent,
      },

      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];

import { EServiceEthicsAccusationRoutingModule } from './e-service-ethics-accusation-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { AccusationDecisionComponent } from './accusation-decision/accusation-decision.component';
import { Routes } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    EServiceUiAccusationInfoModule,
    EServiceDialogAccusationSearchModule,
    EServiceUiAccusationSearchModule,
    EServiceEthicsAccusationRoutingModule,
    SharedUiFormModule,
  ],
  declarations: [AccusationListComponent, AccusationRecordComponent],
  exports: [AccusationListComponent, AccusationRecordComponent],
})
export class EServiceEthicsAccusationModule {}
