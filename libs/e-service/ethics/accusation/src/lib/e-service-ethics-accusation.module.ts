import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { EServiceDialogAccusationSearchModule } from '@ksp/e-service/dialog/accusation-search';
import { MatTabsModule } from '@angular/material/tabs';
import { EServiceUiAccusationInfoModule } from '@ksp/e-service/ui/accusation-info';
import { MatDialogModule } from '@angular/material/dialog';
import { EServiceEthicsAccusationRoutingModule } from './e-service-ethics-accusation-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { AccusationDecisionComponent } from './accusation-decision/accusation-decision.component';
import { BottomNavComponent, StepperNavComponent } from '@ksp/shared/menu';
import {
  LicenseInfoComponent,
  LicenseTypeButtonGroupComponent,
  RequestHeaderInfoComponent,
} from '@ksp/shared/ui';
import { TopNavComponent } from '@ksp/shared/menu';
import { AccusationMainComponent } from './accusation-main/accusation-main.component';
import { AccusationRecordComponent } from './accusation-record/accusation-record.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { AccusationSearchComponent } from '@ksp/shared/search';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    EServiceUiAccusationInfoModule,
    EServiceDialogAccusationSearchModule,
    EServiceEthicsAccusationRoutingModule,
    SharedFormOthersModule,
    BottomNavComponent,
    RequestHeaderInfoComponent,
    TopNavComponent,
    LicenseTypeButtonGroupComponent,
    LicenseInfoComponent,
    AccusationRecordComponent,
    MatCheckboxModule,
    ReactiveFormsModule,
    StepperNavComponent,
    AccusationSearchComponent,
  ],
  declarations: [AccusationDecisionComponent, AccusationMainComponent],
  exports: [AccusationDecisionComponent, AccusationMainComponent],
})
export class EServiceEthicsAccusationModule {}
