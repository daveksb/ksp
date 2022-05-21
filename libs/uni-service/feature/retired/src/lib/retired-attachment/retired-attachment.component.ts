import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/ui/dialog';

@Component({
  selector: 'uni-service-retired-attachment',
  templateUrl: './retired-attachment.component.html',
  styleUrls: ['./retired-attachment.component.scss'],
})
export class RetiredAttachmentComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  prevPage() {
    this.router.navigate(['/', 'retired', 'reason']);
  }

  cancel() {
    this.router.navigate(['/', 'retired', 'search']);
  }

  save() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '350px',
      data: {
        title: `คุณยืนยันข้อมูลและส่งเรื่องเพื่อขออนุมัติใช่หรือไม่ `,
        subTitle: 'ccccc',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onConfirmed();
      }
    });
  }

  onConfirmed() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      height: '250px',
      width: '350px',
      data: {
        content: `xxx `,
        buttonLabel: 'ok',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'login']);
      }
    });
  }
}
