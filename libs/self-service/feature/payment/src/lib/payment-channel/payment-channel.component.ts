import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SelfRequestService } from '@ksp/shared/service';
import { KspRequest } from '@ksp/shared/interface';
import { MatDialog } from '@angular/material/dialog';
import { PrintReceiptDialogComponent } from '@ksp/self-service/ui';
import moment from 'moment';
import { CompleteDialogComponent } from '@ksp/shared/dialog';
import { formatRequestNo, thaiDate } from '@ksp/shared/utility';

@Component({
  templateUrl: './payment-channel.component.html',
  styleUrls: ['./payment-channel.component.css'],
})
export class PaymentChannelComponent implements OnInit {
  kspRequest = new KspRequest();
  qrString = '';
  expireDate: string | null = '';

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private reqService: SelfRequestService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((res) => {
      this.reqService.getRequestById(Number(res.get('id'))).subscribe((res) => {
        //console.log('res = ', res);
        this.kspRequest = res;
        if (res && res.idcardno) {
          this.qrString = res.idcardno + res.requestno;
          this.expireDate = moment().add(1, 'months').format('yyyy-MM-DD'); // มีอายุ 1 เดือน
        }
      });
    });
  }

  cancel() {
    const dialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: `ทำรายการชำระเงินไม่สำเร็จ`,
        isDanger: true,
        showImg: true,
        content: `วันที่ : ${thaiDate(new Date())}
        เลขที่แบบคำขอ : ${formatRequestNo(String(this.kspRequest.requestno))}`,
        subContent: 'หากมีข้อสงสัย กรุณาโทร 02 304 9899',
      },
    });

    dialog.componentInstance.completed.subscribe(() => {
      this.back();
    });
  }

  back() {
    this.router.navigate(['/home']);
  }

  promptpay(type: any) {
    this.router.navigate(['/license', 'payment-promptpay', type]);
  }

  paymentKtb() {
    this.router.navigate([
      '/license',
      'payment-ktb',
      this.kspRequest.requestid,
    ]);
  }

  print() {
    this.dialog.open(PrintReceiptDialogComponent, {
      width: '75vw',
      id: 'dialogTrasparent',
      data: {
        kspRequest: this.kspRequest,
        qrString: this.qrString,
        expireDate: this.expireDate,
      },
    });
  }
}
