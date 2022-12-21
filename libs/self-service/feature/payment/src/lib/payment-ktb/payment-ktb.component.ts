import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CompleteDialogComponent } from '@ksp/shared/dialog';
import { KspRequest } from '@ksp/shared/interface';
import { thaiDate } from '@ksp/shared/utility';
import { Location } from '@angular/common';
import { SelfRequestService } from '@ksp/shared/service';

@Component({
  selector: 'self-service-payment-ktb',
  templateUrl: './payment-ktb.component.html',
  styleUrls: ['./payment-ktb.component.scss'],
})
export class PaymentKtbComponent implements OnInit {
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
    /*     this.route.paramMap.subscribe((res) => {
      this.pageType = Number(res.get('id'));
      console.log('ktb id = ', this.pageType);
    }); */
    this.route.paramMap.subscribe((res) => {
      this.reqService.getRequestById(Number(res.get('id'))).subscribe((res) => {
        console.log('resxx = ', res);
        this.kspRequest = res;
        if (res && res.idcardno) {
          this.qrString = res.idcardno + res.requestno;
          console.log('qr string = ', this.qrString);
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
}
