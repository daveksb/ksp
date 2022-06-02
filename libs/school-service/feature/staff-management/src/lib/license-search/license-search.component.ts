import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'school-service-license-search',
  templateUrl: './license-search.component.html',
  styleUrls: ['./license-search.component.scss'],
})
export class LicenseSearchComponent {
  constructor(private router: Router) {}

  onItemChange(universityCode: string) {}

  search() {}

  goToDetail() {
    this.router.navigate(['./', 'staff-management', 'license-search']);
  }
}
