import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/ui/dialog';
import { ForbiddenPropertyComponent } from '@ksp/shared/ui/forbidden-property';

@Component({
  selector: 'self-service-license-request',
  templateUrl: './license-request.component.html',
  styleUrls: ['./license-request.component.css'],
})
export class LicenseRequestComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  save() {
    const confirmDialog = this.dialog.open(ForbiddenPropertyComponent, {
      width: '900px',
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onCompleted();
      }
    });
  }

  onCompleted() {
    const completeDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการบันทึกข้อมูล
        ใช่หรือไม่?`,
        btnLabel: 'บันทึก',
        cancelBtnLabel: 'ยื่นแบบคำขอ',
      },
    });

    completeDialog.componentInstance.saved.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'license', 'request']);
      }
    });

    completeDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'license', 'payment-channel']);
      }
    });
  }
}
