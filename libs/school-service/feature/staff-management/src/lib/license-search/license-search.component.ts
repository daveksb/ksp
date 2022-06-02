import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'school-service-license-search',
  templateUrl: './license-search.component.html',
  styleUrls: ['./license-search.component.scss'],
})
export class LicenseSearchComponent {
  foundItem = false;
  constructor(private router: Router) {}

  search() {
    this.foundItem = true;
  }

  clear() {
    this.foundItem = false;
  }

  goToDetail() {
    this.router.navigate(['./', 'staff-management', 'license-search']);
  }
}
