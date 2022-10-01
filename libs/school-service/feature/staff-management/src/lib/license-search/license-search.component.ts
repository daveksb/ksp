import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SelfLicense } from '@ksp/shared/constant';
import { SchoolLicenseService } from '@ksp/shared/service';

@Component({
  selector: 'school-service-license-search',
  templateUrl: './license-search.component.html',
  styleUrls: ['./license-search.component.scss'],
})
export class LicenseSearchComponent {
  form = this.fb.group({
    cardno: [],
    licenseno: [],
    name: [],
    licensetype: [],
    licensestatus: [],
    offset: ['0'],
    row: ['100'],
    //schoolid: [],
  });

  //foundItem = false;

  foundLicenses: SelfLicense[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private licenseService: SchoolLicenseService
  ) {}

  addStaff() {
    this.router.navigate(['./staff-management', 'add-staff']);
  }

  search() {
    console.log('form = ', this.form.value);
    const payload = {
      cardno: null,
      licenseno: null,
      name: null,
      licensetype: null,
      licensestatus: null,
      offset: '0',
      row: '10',
    };
    //this.form.value;

    this.licenseService.getStaffLicenses(payload).subscribe((res) => {
      console.log('licenses = ', res);
      if (res) {
        //this.foundItem = true;
        this.foundLicenses = res;
      }
    });
  }

  clear() {
    //this.foundItem = false;
  }

  goToDetail() {
    this.router.navigate(['./staff-management', 'license-search']);
  }
}
