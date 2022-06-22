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
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';
import {
  LicenseInfoComponent,
  LicenseTypeButtonGroupComponent,
  RequestHeaderInfoComponent,
} from '@ksp/shared/new-ui';
import { SharedUiTopNavModule } from '@ksp/shared/ui/top-nav';

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
    SharedUiBottomMenuModule,
    RequestHeaderInfoComponent,
    SharedUiTopNavModule,
    LicenseTypeButtonGroupComponent,
    LicenseInfoComponent,
  ],
  declarations: [AccusationDecisionComponent],
  exports: [AccusationDecisionComponent],
})
export class EServiceEthicsAccusationModule {}
