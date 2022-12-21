import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CompleteDialogComponent } from '@ksp/shared/dialog';
import { thaiDate } from '@ksp/shared/utility';
import localForage from 'localforage';
import { Location } from '@angular/common';
import { KspRequest } from '@ksp/shared/interface';
@Component({
  selector: 'self-service-promptpay',
  templateUrl: './promptpay.component.html',
  styleUrls: ['./promptpay.component.scss'],
})
export class PromptpayComponent implements OnInit {
  pageType!: number;
  qrString = '';
  kspRequest: KspRequest | null = new KspRequest();
  today = new Date();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private location: Location
  ) {}

  ngOnInit(): void {
    localForage.getItem<KspRequest>('ksp-request').then((res) => {
      this.kspRequest = res;
      console.log('res = ', res);
      if (res && res.idcardno && res.requestno) {
        this.qrString = res.idcardno + res.requestno;
        console.log('qr string = ', this.qrString);
      }
    });
    this.route.paramMap.subscribe((res) => {
      this.pageType = Number(res.get('type'));
      //console.log('process type = ', this.pageType);
    });
  }

  complete() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: `ทำรายการสำเร็จ`,
        btnLabel: 'กลับสู่หน้าหลัก',
        content: `วันที่ : ${thaiDate(new Date())}
        เลขที่ใบคำขอ : ${this.kspRequest?.requestno}`,
        subContent: 'หากมีข้อสงสัย กรุณาโทร 02 304 9899',
        showImg: true,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/home']);
      }
    });
  }

  cancel() {
    this.location.back();
  }

  /*   cancel() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: `ทำรายการชำระเงินไม่สำเร็จ`,
        btnLabel: 'กลับสู่หน้าหลัก',
        content: `วันที่ : ${thaiDate(new Date())}
        เลขที่ใบคำขอ : ${this.requestno}`,
        subContent: 'หากมีข้อสงสัย กรุณาโทร 02 304 9899',
        showImg: true,
        isDanger: true,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'home']);
      }
    });
  } */
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
