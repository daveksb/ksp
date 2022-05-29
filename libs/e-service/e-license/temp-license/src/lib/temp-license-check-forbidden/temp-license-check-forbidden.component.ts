import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'e-service-temp-license-check-forbidden',
  templateUrl: './temp-license-check-forbidden.component.html',
  styleUrls: ['./temp-license-check-forbidden.component.scss'],
})
export class TempLicenseCheckForbiddenComponent {
  constructor(private router: Router) {}

  cancel() {
    this.router.navigate(['/', 'temp-license']);
  }

  next() {
    this.router.navigate(['/', 'temp-license', 'confirm']);
  }

  prevPage() {
    this.router.navigate(['/', 'temp-license', 'detail']);
  }
}
