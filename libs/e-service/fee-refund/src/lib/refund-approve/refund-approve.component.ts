import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-refund-approve',
  templateUrl: './refund-approve.component.html',
  styleUrls: ['./refund-approve.component.scss'],
})
export class RefundApproveComponent implements OnInit {
  constructor(private router: Router) {}

  back() {
    this.router.navigate(['/', 'refund', 'detail']);
  }

  cancel() {
    this.router.navigate(['/', 'refund', 'list']);
  }

  ngOnInit(): void {}
}
