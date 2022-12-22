import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { KspRequest } from '@ksp/shared/interface';
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

  cancel() {
    this.location.back();
  }
}
