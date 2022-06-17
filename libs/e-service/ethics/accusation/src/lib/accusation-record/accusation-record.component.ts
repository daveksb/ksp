import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { AccusationSearchComponent, EServiceDialogAccusationSearchModule } from '@ksp/e-service/dialog/accusation-search';
import { EServiceUiAccusationInfoModule } from '@ksp/e-service/ui/accusation-info';
import { EServiceUiAccusationSearchModule } from '@ksp/e-service/ui/accusation-search';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';
import { SharedUiLicenseInfoModule } from '@ksp/shared/ui/license-info';
import { SharedUiLicenseTypeButtonGroupModule } from '@ksp/shared/ui/license-type-button-group';

@Component({
  selector: 'e-service-ethic-accusation-record',
  templateUrl: './accusation-record.component.html',
  styleUrls: ['./accusation-record.component.scss'],
  standalone: true,
  imports: [
    MatTabsModule,
    CommonModule,
    SharedUiBottomMenuModule,
    SharedFormOthersModule,
    SharedUiLicenseTypeButtonGroupModule,
    EServiceUiAccusationInfoModule,
    SharedUiLicenseInfoModule
  ],
})
export class AccusationRecordComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  @Input() hideAllButtons = false;
  @Input() hideContainer = false;
  @Input() hideTitle = false;

  next() {
    this.router.navigate(['/', 'ethics', 'accusation', 'decision']);
  }

  cancel() {
    this.router.navigate(['/', 'ethics', 'accusation']);
  }

  openSearchDialog() {
    this.dialog.open(AccusationSearchComponent, {
      height: '750px',
      width: '1250px',
    });

    /* dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onCompleted();
      }
    }); */
  }
}
