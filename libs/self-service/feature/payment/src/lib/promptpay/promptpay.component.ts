import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CompleteDialogComponent } from '@ksp/shared/dialog';
import { thaiDate } from '@ksp/shared/utility';
import { Location } from '@angular/common';
import { KspRequest } from '@ksp/shared/interface';
import { SelfRequestService } from '@ksp/shared/service';
@Component({
  selector: 'self-service-promptpay',
  templateUrl: './promptpay.component.html',
  styleUrls: ['./promptpay.component.scss'],
})
export class PromptpayComponent implements OnInit {
  pageType!: number;
  qrString = '';
  kspRequest: KspRequest = new KspRequest();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private location: Location,
    private reqService: SelfRequestService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((res) => {
      this.reqService.getRequestById(Number(res.get('id'))).subscribe((res) => {
        this.kspRequest = res;
        if (res && res.idcardno) {
          this.qrString = res.idcardno + res.requestno;
          //console.log('qr string = ', this.qrString);
        }
      });
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
