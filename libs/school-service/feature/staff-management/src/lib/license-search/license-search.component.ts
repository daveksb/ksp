import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'school-service-license-search',
  templateUrl: './license-search.component.html',
  styleUrls: ['./license-search.component.scss'],
})
export class LicenseSearchComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onItemChange(universityCode: string) {}

  search() {}

  goToDetail() {
    this.router.navigate(['./', 'staff-management', 'license-search']);
  }
}
