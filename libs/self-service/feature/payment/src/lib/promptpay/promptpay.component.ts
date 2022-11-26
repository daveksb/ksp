import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CompleteDialogComponent } from '@ksp/shared/dialog';
import { thaiDate } from '@ksp/shared/utility';
import localForage from 'localforage';
@Component({
  selector: 'self-service-promptpay',
  templateUrl: './promptpay.component.html',
  styleUrls: ['./promptpay.component.scss'],
})
export class PromptpayComponent implements OnInit {
  pageType!: number;
  requestno!: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    localForage.getItem('requestno').then((res: any) => {
      this.requestno = res;
      //console.log('xxx = ', res);
    });
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
          content: `วันที่ : ${thaiDate(new Date())}
          เลขที่ใบคำขอ : ${this.requestno}`,
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
        content: `วันที่ : ${thaiDate(new Date())}
        เลขที่ใบคำขอ : ${this.requestno}`,
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
