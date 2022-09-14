import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';
import { ForbiddenPropertyFormComponent } from '@ksp/shared/form/others';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, Observable, tap } from 'rxjs';
import { LicenseRequestService } from './license-request.service';
import {
  AddressService,
  GeneralInfoService,
  EducationDetailService,
} from '@ksp/shared/service';

@UntilDestroy()
@Component({
  templateUrl: './license-request.component.html',
  styleUrls: ['./license-request.component.scss'],
})
export class LicenseRequestComponent implements OnInit {
  form = this.fb.group({
    userInfo: [],
    address1: [],
    address2: [],
    workplace: [],
    education: [],
    experience: [],
  });
  prefixList$!: Observable<any>;
  nationalitys$!: Observable<any>;
  provinces1$!: Observable<any>;
  provinces2$!: Observable<any>;
  provinces3$!: Observable<any>;
  amphurs1$!: Observable<any>;
  tumbols1$!: Observable<any>;
  amphurs2$!: Observable<any>;
  tumbols2$!: Observable<any>;
  amphurs3$!: Observable<any>;
  tumbols3$!: Observable<any>;
  bureau$!: Observable<any>;
  countries$!: Observable<any>;
  countries2$!: Observable<any>;
  licenses$!: Observable<any>;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    public service: LicenseRequestService,
    private addressService: AddressService,
    private generalInfoService: GeneralInfoService,
    private educationDetailService: EducationDetailService
  ) {}

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(debounceTime(300), untilDestroyed(this))
      .subscribe((res) => {
        // console.log('res = ', this.form);
      });
    this.getListData();
  }

  getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.nationalitys$ = this.generalInfoService.getNationality();
    this.provinces1$ = this.addressService.getProvinces();
    this.provinces2$ = this.provinces1$;
    this.provinces3$ = this.provinces1$;
    this.bureau$ = this.educationDetailService.getBureau();
    this.countries$ = this.addressService.getCountry();
    this.countries2$ = this.countries$;
    this.licenses$ = this.educationDetailService.getLicenseType();
  }

  provinceChanged(addrType: number, evt: any) {
    const province = evt.target?.value;
    if (province) {
      if (addrType === 1) {
        this.amphurs1$ = this.addressService.getAmphurs(province);
      } else if (addrType === 2) {
        this.amphurs2$ = this.addressService.getAmphurs(province);
      } else if (addrType === 3) {
        this.amphurs3$ = this.addressService.getAmphurs(province);
      }
    }
  }

  getAmphurChanged(addrType: number, province: any) {
    if (province) {
      if (addrType === 1) {
        this.amphurs1$ = this.addressService.getAmphurs(province);
      } else if (addrType === 2) {
        this.amphurs2$ = this.addressService.getAmphurs(province);
      } else if (addrType === 3) {
        this.amphurs3$ = this.addressService.getAmphurs(province);
      }
    }
  }

  amphurChanged(addrType: number, evt: any) {
    const amphur = evt.target?.value;
    if (amphur) {
      if (addrType === 1) {
        this.tumbols1$ = this.addressService.getTumbols(amphur);
      } else if (addrType === 2) {
        this.tumbols2$ = this.addressService.getTumbols(amphur);
      } else if (addrType === 3) {
        this.tumbols3$ = this.addressService.getTumbols(amphur);
      }
    }
  }

  getTumbon(addrType: number, amphur: any) {
    if (amphur) {
      if (addrType === 1) {
        this.tumbols1$ = this.addressService.getTumbols(amphur);
      } else if (addrType === 2) {
        this.tumbols2$ = this.addressService.getTumbols(amphur);
      } else if (addrType === 3) {
        this.tumbols3$ = this.addressService.getTumbols(amphur);
      }
    }
  }

  useSameAddress(evt: any) {
    const checked = evt.target.checked;
    if (checked) {
      this.form.controls.address2.patchValue(this.form.controls.address1.value);
    }
  }

  save() {
    console.log(this.form.value);
    const confirmDialog = this.dialog.open(ForbiddenPropertyFormComponent, {
      width: '900px',
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onCompleted();
      }
    });
  }

  onCompleted() {
    const completeDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการบันทึกข้อมูล
        ใช่หรือไม่?`,
        btnLabel: 'ยื่นแบบคำขอ',
        cancelBtnLabel: 'บันทึก',
      },
    });

    completeDialog.componentInstance.saved.subscribe((res) => {
      if (res) {
        this.router.navigate(['/license', 'request']);
      }
    });

    completeDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/license', 'payment-channel']);
      }
    });
  }
}
