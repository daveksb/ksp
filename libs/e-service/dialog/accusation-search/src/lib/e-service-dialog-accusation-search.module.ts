import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccusationSearchComponent } from './accusation-search/accusation-search.component';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { EServiceUiAccusationInfoModule } from '@ksp/e-service/ui/accusation-info';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedUiLicenseInfoModule } from '@ksp/shared/ui/license-info';
import { SharedUiLicenseTypeButtonGroupModule } from '@ksp/shared/ui/license-type-button-group';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatTabsModule,
    MatDialogModule,
    MatIconModule,
    EServiceUiAccusationInfoModule,
    SharedUiLicenseInfoModule,
    SharedUiLicenseTypeButtonGroupModule,
  ],
  declarations: [AccusationSearchComponent],
  exports: [AccusationSearchComponent],
})
export class EServiceDialogAccusationSearchModule {}
