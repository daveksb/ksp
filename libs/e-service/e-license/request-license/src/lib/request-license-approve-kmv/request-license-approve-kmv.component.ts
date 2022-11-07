import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';

@Component({
  selector: 'ksp-request-license-approve-kmv',
  templateUrl: './request-license-approve-kmv.component.html',
  styleUrls: ['./request-license-approve-kmv.component.scss'],
})
export class RequestLicenseApproveKmvComponent {
  constructor(private dialog: MatDialog, private router: Router) {}

  //ngOnInit(): void {}

  cancel() {
    this.router.navigate(['/request-license', 'guarantee']);
  }

  confirmDialog() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณค้องการยืนยันข้อมูลใช่หรือไม่? `,
        btnLabel: `บันทึก`,
      },
    });

    dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/request-license', 'guarantee']);
      }
    });
  }
}
