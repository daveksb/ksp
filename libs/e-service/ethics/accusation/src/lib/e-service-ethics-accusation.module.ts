import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccusationListComponent } from './accusation-list/accusation-list.component';
import { AccusationRecordComponent } from './accusation-record/accusation-record.component';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { EServiceUiAccusationSearchModule } from '@ksp/e-service/ui/accusation-search';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedUiFormModule } from '@ksp/shared/ui/form';
import {
  AccusationSearchComponent,
  EServiceDialogAccusationSearchModule,
} from '@ksp/e-service/dialog/accusation-search';

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
    EServiceUiAccusationSearchModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    SharedUiFormModule,
    EServiceDialogAccusationSearchModule,
  ],
  declarations: [AccusationListComponent, AccusationRecordComponent],
  exports: [AccusationListComponent, AccusationRecordComponent],
})
export class EServiceEthicsAccusationModule {}
