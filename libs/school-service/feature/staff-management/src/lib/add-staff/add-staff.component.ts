import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Event, Router } from '@angular/router';
import {
  AddressService,
  GeneralInfoService,
  StaffService,
} from '@ksp/shared/service';
import { filter, Observable } from 'rxjs';
import { replaceEmptyWithNull, thaiDate } from '@ksp/shared/utility';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss'],
})
export class AddStaffComponent implements OnInit {
  staffId!: number;

  countries$!: Observable<any>;
  provinces$!: Observable<any>;
  amphurs1$!: Observable<any>;
  tumbols1$!: Observable<any>;
  amphurs2$!: Observable<any>;
  tumbols2$!: Observable<any>;
  prefixList$!: Observable<any>;
  staffTypes$!: Observable<any>;
  positionTypes$!: Observable<any>;
  academicTypes$!: Observable<any>;
  schoolId = '0010201056';
  today = thaiDate(new Date());
  mode: 'view' | 'edit' | 'add' = 'add';

  form = this.fb.group({
    userInfo: [],
    addr1: [],
    addr2: [],
    edu1: [],
    edu2: [],
    teachingInfo: [],
    hiringInfo: [],
  });

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private staffService: StaffService,
    private addressService: AddressService,
    private generalInfoService: GeneralInfoService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form.reset();
    this.checkMode();
    this.getListData();

    this.activatedroute.paramMap.subscribe((params) => {
      this.staffId = Number(params.get('id'));
      if (this.staffId) {
        this.loadStaffData(this.staffId);
      }
    });
  }

  checkMode() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('view-staff')) {
          this.mode = 'view';
          this.form.disable();
        } else if (event.url.includes('edit-staff')) {
          this.mode = 'edit';
        } else {
          this.mode = 'add';
        }
      }
    });
  }

  loadStaffData(staffId: number) {
    this.staffService
      .searchStaffFromId(staffId)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        //console.log('staff 2 data = ', res);
        this.pathUserInfo(res);
        this.patchAddress(JSON.parse(atob(res.addresses)));
        this.patchEdu(JSON.parse(atob(res.educations)));
      });
  }

  save() {
    if (this.staffId) {
      this.updateStaff();
    } else {
      this.insertStaff();
    }
  }

  insertStaff() {
    const formData: any = this.form.getRawValue();
    formData.userInfo.schoolId = this.schoolId;
    formData.userInfo.createDate = new Date().toISOString().split('.')[0];
    formData.addr1.addressType = 1;
    formData.addr2.addressType = 2;
    const { id, ...userInfo } = formData.userInfo;

    const payload = {
      ...userInfo,
      ...{ addresses: JSON.stringify([formData.addr1, formData.addr2]) },
      ...{ educations: JSON.stringify([formData.edu1, formData.edu2]) },
      ...{ teachingInfo: JSON.stringify(formData.teachingInfo) },
      ...{ hiringInfo: JSON.stringify(formData.workingInfo) },
    };

    console.log('insert payload = ', payload);
    this.staffService.addStaff2(payload).subscribe((res) => {
      console.log('add staff result = ', res);
      this.onCompleted();
      this.form.reset();
    });
  }

  updateStaff() {
    //
  }
  /*   updateStaff() {
    const formData: any = this.form.getRawValue();
    formData.userInfo.schoolId = this.schoolId;
    formData.userInfo.nationality = 'TH';
    console.log('update formData = ', formData);

    formData.userInfo = replaceEmptyWithNull(formData.userInfo);
    formData.addr1 = replaceEmptyWithNull(formData.addr1);
    formData.addr2 = replaceEmptyWithNull(formData.addr2);
    formData.edu1 = replaceEmptyWithNull(formData.edu1);
    formData.edu2 = replaceEmptyWithNull(formData.edu2);
    const tokenkey = getCookie('schUserToken');
    this.staffService.updateStaff(formData, tokenkey).subscribe((res) => {
      //console.log('update staff result = ', res);
      this.snackBar.open('แก้ไขข้อมูลสำเร็จ', 'ปิด', {
        duration: 2000,
      });
    });
  } */

  useSameAddress(evt: any) {
    const checked = evt.target.checked;
    this.amphurs2$ = this.amphurs1$;
    this.tumbols2$ = this.tumbols1$;

    if (checked) {
      this.form.controls.addr2.patchValue(this.form.controls.addr1.value);
    }
  }

  provinceChanged(type: number, evt: any) {
    const province = evt.target?.value;
    if (province) {
      if (type === 1) {
        this.amphurs1$ = this.addressService.getAmphurs(province);
      } else if (type === 2) {
        this.amphurs2$ = this.addressService.getAmphurs(province);
      }
    }
  }

  amphurChanged(type: number, evt: any) {
    const amphur = evt.target?.value;
    if (amphur) {
      if (type === 1) {
        this.tumbols1$ = this.addressService.getTumbols(amphur);
      } else if (type === 2) {
        this.tumbols2$ = this.addressService.getTumbols(amphur);
      }
    }
  }

  getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.provinces$ = this.addressService.getProvinces();
    this.countries$ = this.addressService.getCountry();

    this.staffTypes$ = this.staffService.getStaffTypes();
    this.positionTypes$ = this.staffService.getPositionTypes();
    this.academicTypes$ = this.staffService.getAcademicStandingTypes();
  }

  cancel() {
    this.router.navigate(['/staff-management', 'list']);
  }

  onConfirmed() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        btnLabel: 'บันทึก',
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.save();
      }
    });
  }

  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: `ยืนยันข้อมูลสำเร็จ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        //this.cancel();
      }
    });
  }

  get addr1(): any {
    return this.form.controls.addr1;
  }

  get addr2(): any {
    return this.form.controls.addr2;
  }

  patchEdu(edus: any[]) {
    //console.log('edus = ', edus);
    if (edus && edus.length) {
      edus.map((edu, i) => {
        if (i === 0) {
          this.form.controls.edu1.patchValue(edu);
        }
        if (i === 1) {
          this.form.controls.edu2.patchValue(edu);
        }
      });
    }
  }

  patchAddress(addrs: any[]) {
    //console.log('add data = ', addrs);
    if (addrs && addrs.length) {
      addrs.map((addr: any, i: number) => {
        if (i === 0) {
          this.amphurs1$ = this.addressService.getAmphurs(addr.province);
          this.tumbols1$ = this.addressService.getTumbols(addr.amphur);
          this.form.controls.addr1.patchValue(addr);
        }
        if (i === 1) {
          this.amphurs2$ = this.addressService.getAmphurs(addr.province);
          this.tumbols2$ = this.addressService.getTumbols(addr.amphur);
          this.form.controls.addr2.patchValue(addr);
        }
      });
    }
  }

  pathUserInfo(data: any) {
    const {
      schoolId,
      createDate,
      addresses,
      educations,
      teachinginfo,
      hiringinfo,
      ...formData
    } = data;
    formData.birthDate = formData.birthDate.split('T')[0];
    this.form.controls.userInfo.patchValue(formData);
  }
}
