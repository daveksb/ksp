import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-request-license-approve-kmv',
  templateUrl: './request-license-approve-kmv.component.html',
  styleUrls: ['./request-license-approve-kmv.component.scss'],
})
export class RequestLicenseApproveKmvComponent {
  constructor(private router: Router) {}

  //ngOnInit(): void {}

  cancel() {
    this.router.navigate(['/request-license', 'guarantee']);
  }
}
