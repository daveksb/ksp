import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CompleteDialogComponent } from '@ksp/shared/dialog';
import { untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'self-service-promptpay',
  templateUrl: './promptpay.component.html',
  styleUrls: ['./promptpay.component.scss'],
})
export class PromptpayComponent implements OnInit {
  pageType!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((res) => {
      this.pageType = Number(res.get('type'));
      //console.log('process type = ', this.pageType);
    });
    setTimeout(() => {
      const completeDialog = this.dialog.open(CompleteDialogComponent, {
        width: '350px',
        data: {
          header: `ทำรายการสำเร็จ`,
          btnLabel: 'กลับสู่หน้าหลัก',
          content: `วันที่ : 10 ตุลาคม 2565
          เลขที่ใบคำขอ : 12234467876543`,
          subContent: 'หากมีข้อสงสัย กรุณาโทร 02 304 9899 ',
        },
      });

      completeDialog.componentInstance.completed.subscribe((res) => {
        if (res) {
          this.router.navigate(['/', 'home']);
        }
      });
    }, 15000);
  }

  cancel() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: `ทำรายการชำระเงินไม่สำเร็จ`,
        btnLabel: 'กลับสู่หน้าหลัก',
        content: `วันที่ : 10 ตุลาคม 2565
        เลขที่ใบคำขอ : 12234467876543`,
        subContent: 'หากมีข้อสงสัย กรุณาโทร 02 304 9899 ',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'home']);
      }
    });
  }
}

/* setTimeout(() => {
  const completeDialog = this.dialog.open(CompleteDialogComponent, {
    width: '350px',
    data: {
      header: `ชำระเงินสำเร็จ`,
      btnLabel: 'กลับสู่หน้าหลัก',
    },
  });

  completeDialog.componentInstance.completed.subscribe((res) => {
    if (res) {
      this.router.navigate(['/', 'license', 'teacher']);
    }
  });
}, 5000); */
