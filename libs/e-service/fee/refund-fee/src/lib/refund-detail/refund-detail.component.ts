import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-refund-detail',
  templateUrl: './refund-detail.component.html',
  styleUrls: ['./refund-detail.component.scss'],
})
export class RefundDetailComponent implements OnInit {
  refundInfo = ['1.สำเนาวุฒิการศึกษา'];
  choices = ['ครบถ้วน และถูกต้อง', 'ไม่ครบถ้วน และไม่ถูกต้อง'];

  constructor(private router: Router) {}

  nextPage() {
    this.router.navigate(['/', 'refund', 'approve']);
  }

  cancel() {
    this.router.navigate(['/', 'refund', 'list']);
  }

  ngOnInit(): void {}
}
