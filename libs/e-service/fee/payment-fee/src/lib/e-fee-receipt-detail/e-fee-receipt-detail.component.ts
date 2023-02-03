import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-e-fee-receipt-detail',
  templateUrl: './e-fee-receipt-detail.component.html',
  styleUrls: ['./e-fee-receipt-detail.component.scss'],
})
export class EFeeReceiptDetailComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  cancel() {
    this.router.navigate(['/payment-fee', 'list']);
  }
}
