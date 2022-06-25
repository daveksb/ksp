import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'school-service-license-search',
  templateUrl: './license-search.component.html',
  styleUrls: ['./license-search.component.scss'],
})
export class LicenseSearchComponent {
  form = this.fb.group({
    personId: [],
    licenseNumber: [],
    name: [],
    licenseType: [],
  });

  foundItem = false;
  constructor(private router: Router, private fb: FormBuilder) {}

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
