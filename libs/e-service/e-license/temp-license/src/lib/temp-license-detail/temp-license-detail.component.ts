import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'e-service-temp-license-detail',
  templateUrl: './temp-license-detail.component.html',
  styleUrls: ['./temp-license-detail.component.scss'],
})
export class TempLicenseDetailComponent {
  constructor(private router: Router) {}

  next() {
    this.router.navigate(['/', 'forbidden']);
  }

  back() {
    this.router.navigate(['/', 'temp-license-list']);
  }
}
