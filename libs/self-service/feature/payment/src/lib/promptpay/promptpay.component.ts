import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CompleteDialogComponent } from '@ksp/shared/ui/dialog';

@Component({
  selector: 'self-service-promptpay',
  templateUrl: './promptpay.component.html',
  styleUrls: ['./promptpay.component.scss'],
})
export class PromptpayComponent implements OnInit {
  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    setTimeout(() => {
      const completeDialog = this.dialog.open(CompleteDialogComponent, {
        width: '350px',
        data: {
          header: `ชำระเงินสำเร็จ`,
          btnLabel: 'กลับสู่หน้าหลัก',
        },
      });

      completeDialog.componentInstance.completed.subscribe((res) => {
        if (res) {
          this.router.navigate(['/', 'license', 'request']);
        }
      });
    }, 5000);
  }
}
