import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SelfRequestService } from '@ksp/shared/service';

@Component({
  templateUrl: './payment-channel.component.html',
  styleUrls: ['./payment-channel.component.css'],
})
export class PaymentChannelComponent implements OnInit {
  requestno!: string | null;
  requestdate!: string;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private reqService: SelfRequestService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((res) => {
      const reqId = Number(res.get('id'));
      this.reqService.getRequestById(reqId).subscribe((res) => {
        console.log('res = ', res);
        this.requestno = res.requestno;
      });
    });
  }

  cancel() {
    this.location.back();
  }

  promptpay(type: any) {
    this.router.navigate(['/license', 'payment-promptpay', type]);
  }
}
