import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { staffLicenseTypes } from '@ksp/shared/constant';
import { ListData, SelfLicense } from '@ksp/shared/interface';
import { SchoolLicenseService } from '@ksp/shared/service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import localForage from 'localforage';
@UntilDestroy()
@Component({
  selector: 'school-service-license-search',
  templateUrl: './license-search.component.html',
  styleUrls: ['./license-search.component.scss'],
})
export class LicenseSearchComponent {
  licenseTypes: ListData[] = staffLicenseTypes;

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

  notFoundItem = false;
  foundLicenses: SelfLicense[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private licenseService: SchoolLicenseService
  ) {}

  addStaff() {
    this.router.navigate(['./staff-management', 'add-staff']);
  }

  clear() {
    this.form.reset();
    this.foundLicenses = [];
    this.notFoundItem = false;
  }

  search() {
    const payload = {
      cardno: this.form.controls.cardno.value,
      licenseno: this.form.controls.licenseno.value,
      name: this.form.controls.name.value,
      licensetype: null,
      licensestatus: null,
      offset: '0',
      row: '100',
    };

    this.licenseService
      .getStaffLicenses(payload)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        if (res) {
          this.foundLicenses = res;
        } else {
          this.foundLicenses = [];
          this.notFoundItem = true;
        }
      });
  }

  onSelect(licenseNo: string) {
    const payload = {
      cardno: null,
      licenseno: licenseNo,
      name: null,
      licensetype: null,
      licensestatus: null,
      offset: '0',
      row: '10',
    };

    this.licenseService
      .getStaffLicenses(payload)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        console.log('licenses = ', res);
        localForage.setItem('add-staff-has-license', res[0]);
        this.router.navigate(['./staff-management', 'add-staff-has-license']);
      });
  }

  goToDetail() {
    this.router.navigate(['./staff-management', 'license-search']);
  }
}
