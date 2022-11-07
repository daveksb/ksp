import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-request-license-approve-print',
  templateUrl: './request-license-approve-print.component.html',
  styleUrls: ['./request-license-approve-print.component.scss'],
})
export class RequestLicenseApprovePrintComponent {
  constructor(private router: Router) {}

  //ngOnInit(): void {}

  cancel() {
    this.router.navigate(['/request-license', 'search-list']);
  }
}
