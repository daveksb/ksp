import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/ui/dialog';

@Component({
  selector: 'school-service-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  cancel() {
    this.router.navigate(['/', 'login']);
  }

  accept() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      height: '150px',
      width: '350px',
      data: {
        title: `ไม่พบข้อมูลของท่านภายในระบบ`,
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'forget-password', 'set-password']);
      }
    });
  }
}
