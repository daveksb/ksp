import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { EServiceUiAccusationInfoModule } from '@ksp/e-service/ui/accusation-info';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { SharedUiLicenseInfoModule } from '@ksp/shared/ui/license-info';
import { SharedUiLicenseTypeButtonGroupModule } from '@ksp/shared/ui/license-type-button-group';
import { RequestHeaderInfoComponent } from '@ksp/shared/new-ui';

@Component({
  selector: 'e-service-inquiry-result',
  templateUrl: './inquiry-result.component.html',
  styleUrls: ['./inquiry-result.component.scss'],
  standalone: true,
  imports: [
    MatTabsModule,
    CommonModule,
    SharedUiBottomMenuModule,
    SharedFormOthersModule,
    SharedUiLicenseTypeButtonGroupModule,
    EServiceUiAccusationInfoModule,
    SharedUiLicenseInfoModule,
    RequestHeaderInfoComponent,
  ],
})
export class InquiryResultComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  @Input() hideAllButtons = false;
  @Input() hideContainer = false;
  @Input() hideTitle = false;

  cancel() {
    this.router.navigate(['/', 'ethics', 'inquiry']);
  }

  back() {
    this.router.navigate(['/', 'ethics', 'inquiry', 'detail']);
  }

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      height: '175px',
      width: '350px',
      data: {
        title: `คุณยืนยันการบันทึกข้อมูล
        ใช่หรือไม่? `,
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onCompleted();
      }
    });
  }

  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      height: '275px',
      width: '375px',
      data: {
        header: `ยืนยันข้อมูลสำเร็จ`,
        content: `เลขที่รายการ : 640120000123
        วันที่ : 10 ตุลาคม 2656`,
        subContent: 'ผู้บันทึกข้อมูล : นางสาวปาวีณา ใกล้คุก',
        buttonLabel: 'กลับสู่หน้าหลัก',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'ethics', 'inquiry']);
      }
    });
  }
}
