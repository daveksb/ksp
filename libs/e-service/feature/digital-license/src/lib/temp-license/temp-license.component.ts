import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'e-service-temp-license',
  templateUrl: './temp-license.component.html',
  styleUrls: ['./temp-license.component.scss'],
})
export class TempLicenseComponent {
  constructor(private router: Router) {}

  next() {
    this.router.navigate(['/', 'forbidden']);
  }

  back() {
    this.router.navigate(['/', 'temp-license-list']);
  }
}
