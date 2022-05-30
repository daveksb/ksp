import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccusationListComponent } from './accusation-list/accusation-list.component';
import { AccusationRecordComponent } from './accusation-record/accusation-record.component';
import { EServiceUiAccusationSearchModule } from '@ksp/e-service/ui/accusation-search';
import { SharedUiFormModule } from '@ksp/shared/ui/form';
import { EServiceDialogAccusationSearchModule } from '@ksp/e-service/dialog/accusation-search';

import { MatTabsModule } from '@angular/material/tabs';
import { EServiceUiAccusationInfoModule } from '@ksp/e-service/ui/accusation-info';
import { MatDialogModule } from '@angular/material/dialog';

import { EServiceEthicsAccusationRoutingModule } from './e-service-ethics-accusation-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EServiceUiAccusationSearchModule,
    EServiceEthicsAccusationRoutingModule,
    SharedUiFormModule,
    EServiceDialogAccusationSearchModule,
    MatTabsModule,
    EServiceUiAccusationInfoModule,
    MatDialogModule,
  ],
  declarations: [AccusationListComponent, AccusationRecordComponent],
  exports: [AccusationListComponent, AccusationRecordComponent],
})
export class EServiceEthicsAccusationModule {}
