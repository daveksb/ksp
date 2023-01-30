import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { staffLicenseTypes } from '@ksp/shared/constant';
import { ListData, SelfLicense } from '@ksp/shared/interface';
import { LoaderService, SchoolLicenseService } from '@ksp/shared/service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import localForage from 'localforage';
import { Subject } from 'rxjs';
@UntilDestroy()
@Component({
  selector: 'school-service-license-search',
  templateUrl: './license-search.component.html',
  styleUrls: ['./license-search.component.scss'],
})
export class LicenseSearchComponent {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  licenseTypes: ListData[] = staffLicenseTypes;
  currentPage!: any;
  payload: any;

  form = this.fb.group({
    cardno: [],
    licenseno: [],
    name: [],
    licensetype: [],
    licensestatus: [],
    offset: '0',
    row: '10',
    //schoolid: [],
  });

  notFoundItem = false;
  foundLicenses: SelfLicense[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private licenseService: SchoolLicenseService,
    private loaderService: LoaderService
  ) {}

  addStaff() {
    this.router.navigate(['./staff-management', 'add-staff']);
  }

  clear() {
    this.foundLicenses = [];
    this.notFoundItem = false;
    this.form.reset();
    this.form.patchValue({
      offset: '0',
      row: '10',
    });
  }

  search() {
    const data = this.form.getRawValue() as any;
    const { offset, row } = data;
    this.currentPage = 1;
    this.notFoundItem = false;
    let payload = {};

    payload = {
      cardno: this.form.controls.cardno.value,
      licenseno: this.form.controls.licenseno.value,
      name: this.form.controls.name.value,
      licensetype: this.form.controls.licensetype.value,
      licensestatus: null,
      offset,
      row,
    };

    this.licenseService
      .getStaffLicenses(payload)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        if (res) {
          this.foundLicenses = res;
          this.payload = payload;
          this.notFoundItem = false;
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

  goBack() {
    this.router.navigate(['./staff-management', 'list']);
  }

  goPrevious() {
    if (this.currentPage == 1) return;
    const { offset, ...payload } = this.payload || '';
    payload.offset = parseInt(offset) - parseInt(payload.row);
    payload.offset = payload.offset.toString();

    this.licenseService.getStaffLicenses(payload).subscribe((res) => {
      this.currentPage -= 1;
      this.payload = payload;
      this.foundLicenses = res;
    });
  }

  goNext() {
    const { offset, ...payload } = this.payload || '';
    payload.offset = parseInt(offset) + parseInt(payload.row);
    payload.offset = payload.offset.toString();

    this.licenseService.getStaffLicenses(payload).subscribe((res) => {
      this.currentPage += 1;
      this.payload = payload;
      this.foundLicenses = res;
    });
  }
}
