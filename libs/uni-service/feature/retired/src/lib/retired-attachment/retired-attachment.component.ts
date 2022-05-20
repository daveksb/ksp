import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/ui/dialog';

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
        title: `คุณยืนยันข้อมูลและส่งเรื่องเพื่อขออนุมัติ <br />
      ใช่หรือไม่ 66`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
