import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AddressService,
  GeneralInfoService,
  StaffService,
} from '@ksp/shared/service';
import { Observable } from 'rxjs';
import {
  formatCheckboxData,
  parseJson,
  replaceEmptyWithNull,
  thaiDate,
} from '@ksp/shared/utility';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { levels, subjects, UserInfoFormType } from '@ksp/shared/constant';
import { FormMode } from '@ksp/shared/interface';
import localForage from 'localforage';

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
  mode: FormMode = 'edit';
  userInfoType = UserInfoFormType.thai;
  searchStaffDone = false;
  kuruspaNo = '';

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

    this.activatedroute.paramMap
      .pipe(untilDestroyed(this))
      .subscribe((params) => {
        this.staffId = Number(params.get('id'));
        if (this.staffId) {
          this.loadStaffData(this.staffId);
        }
      });
  }

  searchIdCard(idcardno: string) {
    const payload = {
      idcardno,
      schoolid: this.schoolId,
    };

    this.staffService
      .searchStaffFromIdCard(payload)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        //console.log('res = ', res);
        if (res && res.returncode !== '98') {
          this.patchAll(res);
        } else {
          // search not found reset form and set idcard again
          this.form.reset();
          const temp: any = { idcardno };
          this.form.controls.userInfo.patchValue(temp);
        }
        this.searchStaffDone = true;
      });
  }

  save() {
    if (this.staffId) {
      this.updateStaff();
    } else {
      this.insertStaff();
    }
  }

  pathTeachingInfo(res: any) {
    //console.log('teaching = ', res);
    const teachingLevel = levels.map((level) => {
      if (res.teachingLevel.includes(level.value)) {
        return level.value;
      } else {
        return false;
      }
    });

    const teachingSubjects = subjects.map((subj) => {
      if (res.teachingSubjects.includes(subj.value)) {
        return subj.value;
      } else {
        return false;
      }
    });
    const data = {
      ...res,
      teachingLevel,
      teachingSubjects,
    };
    this.form.controls.teachingInfo.patchValue(data);
  }

  checkMode() {
    if (this.router.url.includes('add-staff-has-license')) {
      this.searchStaffDone = true;
      this.mode = 'edit';
      this.patchDataFromLicense();
    } else if (this.router.url.includes('view-staff')) {
      this.searchStaffDone = true;
      this.mode = 'view';
      this.form.disable();
    } else {
      // add staff
      this.mode = 'edit';
    }
  }

  /**
   * * this person has license patch data from indexedDB
   */
  patchDataFromLicense() {
    localForage.getItem('add-staff-has-license').then((res: any) => {
      console.log('stored data = ', res);
      this.form.controls.userInfo.patchValue(res);
      //this.pathUserInfo(res);
    });
  }

  loadStaffData(staffId: number) {
    this.staffService
      .searchStaffFromId(staffId)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.patchAll(res);
      });
  }

  patchAll(res: any) {
    this.pathUserInfo(res);
    this.patchAddress(parseJson(res.addresses));
    this.patchEdu(parseJson(res.educations));
    this.pathTeachingInfo(parseJson(res.teachinginfo));
    this.form.controls.hiringInfo.patchValue(parseJson(res.hiringinfo));
  }

  insertStaff() {
    const formData: any = this.form.getRawValue();
    formData.addr1.addressType = 1;
    formData.addr2.addressType = 2;

    const { id, ...userInfo } = formData.userInfo;
    userInfo.schoolid = this.schoolId;
    userInfo.createdate = new Date().toISOString().split('.')[0];

    const teaching: any = this.form.controls.teachingInfo.value;
    const teachingLevel = formatCheckboxData(teaching.teachingLevel, levels);
    const teachingSubjects = formatCheckboxData(
      teaching.teachingSubjects,
      subjects
    );
    const teachingInfo = {
      teachingLevel,
      teachingSubjects,
      teachingSubjectOther: teaching.teachingSubjectOther || null,
    };

    const payload = {
      ...userInfo,
      ...{ addresses: JSON.stringify([formData.addr1, formData.addr2]) },
      ...{ educations: JSON.stringify([formData.edu1, formData.edu2]) },
      ...{ teachinginfo: JSON.stringify(teachingInfo) },
      ...{ hiringinfo: JSON.stringify(formData.hiringInfo) },
    };
    //console.log('insert payload = ', payload);
    this.staffService.addStaff(payload).subscribe((res) => {
      //console.log('add staff result = ', res);
      this.onCompleted();
      this.form.reset();
    });
  }

  updateStaff() {
    const formData: any = this.form.getRawValue();
    //const { ...userInfo } = replaceEmptyWithNull(formData.userInfo);
    formData.userInfo.schoolid = this.schoolId;

    const teaching: any = this.form.controls.teachingInfo.value;
    const teachingLevel = formatCheckboxData(teaching.teachingLevel, levels);
    const teachingSubjects = formatCheckboxData(
      teaching.teachingSubjects,
      subjects
    );
    const teachingInfo = {
      teachingLevel,
      teachingSubjects,
      teachingSubjectOther: teaching.teachingSubjectOther || null,
    };

    let payload = {
      ...formData.userInfo,
      ...{ addresses: JSON.stringify([formData.addr1, formData.addr2]) },
      ...{ educations: JSON.stringify([formData.edu1, formData.edu2]) },
      ...{
        teachinginfo: JSON.stringify(teachingInfo),
      },
      ...{ hiringinfo: JSON.stringify(formData.hiringInfo) },
    };

    payload = replaceEmptyWithNull(payload);

    this.staffService.updateStaff(payload).subscribe((res) => {
      //console.log('update result = ', res);
    });
  }

  pathUserInfo(data: any) {
    data.birthdate = data.birthdate.split('T')[0];
    this.form.controls.userInfo.patchValue(data);
  }

  useSameAddress(evt: any) {
    const checked = evt.target.checked;
    this.amphurs2$ = this.amphurs1$;
    this.tumbols2$ = this.tumbols1$;
    if (checked) {
      this.form.controls.addr2.patchValue(this.form.controls.addr1.value);
    }
  }

  provinceChanged(addrType: number, evt: any) {
    const province = evt.target?.value;
    if (province) {
      if (addrType === 1) {
        this.amphurs1$ = this.addressService.getAmphurs(province);
      } else if (addrType === 2) {
        this.amphurs2$ = this.addressService.getAmphurs(province);
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
        this.cancel();
      }
    });
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

  get addr1() {
    return this.form.controls.addr1;
  }

  get addr2() {
    return this.form.controls.addr2;
  }
}
