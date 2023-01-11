import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { KspPayment, KspRequest } from '@ksp/shared/interface';
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
          //console.log('res  = ', res);
          this.kspRequest = res;
          const payload: KspPayment = {
            reqid: res.id,
            reqno: res.requestno,
            reqtype: res.requesttype,
            idcardno: res.idcardno,
            amount: '500',
            prefixth: res.prefixth,
            firstnameth: res.firstnameth,
            lastnameth: res.lastnameth,
            prefixen: res.prefixen,
            firstnameen: res.firstnameen,
            lastnameen: res.lastnameen,
            paymentchannel: '0',
            qrcode: this.qrString,
            paymentstatus: '0',
            errorcode: null,
            remark: null,
          };
          this.reqService.createPayment(payload).subscribe((res) => {
            console.log('create payment = ', res);
          });
        }
      });
    });
  }

  cancel() {
    this.location.back();
  }
}
