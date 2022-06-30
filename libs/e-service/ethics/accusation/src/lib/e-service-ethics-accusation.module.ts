import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EServiceUiAccusationSearchModule } from '@ksp/e-service/ui/accusation-search';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { EServiceDialogAccusationSearchModule } from '@ksp/e-service/dialog/accusation-search';
import { MatTabsModule } from '@angular/material/tabs';
import { EServiceUiAccusationInfoModule } from '@ksp/e-service/ui/accusation-info';
import { MatDialogModule } from '@angular/material/dialog';
import { EServiceEthicsAccusationRoutingModule } from './e-service-ethics-accusation-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { AccusationDecisionComponent } from './accusation-decision/accusation-decision.component';
import { BottomNavComponent } from '@ksp/shared/menu';
import {
  LicenseInfoComponent,
  LicenseTypeButtonGroupComponent,
  RequestHeaderInfoComponent,
  StepperNavComponent,
} from '@ksp/shared/ui';
import { TopNavComponent } from '@ksp/shared/menu';
import { AccusationMainComponent } from './accusation-main/accusation-main.component';
import { AccusationRecordComponent } from './accusation-record/accusation-record.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';

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
  ],
  declarations: [AccusationDecisionComponent, AccusationMainComponent],
  exports: [AccusationDecisionComponent, AccusationMainComponent],
})
export class EServiceEthicsAccusationModule {}
