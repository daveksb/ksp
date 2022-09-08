import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService, GeneralInfoService } from '@ksp/shared/service';
import { Observable } from 'rxjs';
import { StaffPersonInfoService } from '@ksp/shared/service';
import { replaceEmptyWithNull, thaiDate } from '@ksp/shared/utility';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { MatDialog } from '@angular/material/dialog';

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

  today = thaiDate(new Date());

  form = this.fb.group({
    userInfo: [],
    addr1: [],
    addr2: [],
    edu1: [],
    edu2: [],
  });

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private staffService: StaffPersonInfoService,
    private addressService: AddressService,
    private generalInfoService: GeneralInfoService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params) => {
      this.staffId = Number(params.get('id'));
      if (this.staffId) {
        this.pathUserInfo();
        this.patchAddress();
        this.patchEdu();
      }
    });

    this.getListData();
  }

  pathUserInfo() {
    this.staffService.getStaffUserInfo(this.staffId).subscribe((res) => {
      const { schoolId, createDate, ...formData } = res;
      formData.birthDate = formData.birthDate.split('T')[0];
      formData.passportStartDate = null;
      formData.passportEndDate = null;
      formData.middleNameTh = null;
      formData.middleNameEn = null;
      formData.country = null;
      //console.log('form xx = ', formData);
      this.form.controls.userInfo.patchValue(formData);
    });
  }

  patchAddress() {
    this.addressService
      .getStaffAddress(this.staffId)
      .subscribe((res: any[]) => {
        //array of address
        res.map((addr, i) => {
          const { schStaffId, ...formData } = addr;
          if (i === 0) {
            this.amphurs1$ = this.addressService.getAmphurs(addr.province);
            this.tumbols1$ = this.addressService.getTumbols(addr.amphur);
            this.form.controls.addr1.patchValue(formData);
          }
          if (i === 1) {
            this.amphurs2$ = this.addressService.getAmphurs(addr.province);
            this.tumbols2$ = this.addressService.getTumbols(addr.amphur);
            this.form.controls.addr2.patchValue(formData);
          }
        });
      });
  }

  patchEdu() {
    this.staffService.getStaffEdu(this.staffId).subscribe((res: any[]) => {
      if (res && res.length) {
        res.map((edu, i) => {
          const { schStaffId, ...formData } = edu;
          formData.admissionDate = formData.admissionDate.split('T')[0];
          formData.graduateDate = formData.graduateDate.split('T')[0];
          //console.log('edu form = ', formData);
          if (i === 0) {
            this.form.controls.edu1.patchValue(formData);
          }
          if (i === 1) {
            this.form.controls.edu2.patchValue(formData);
          }
        });
      }
    });
  }

  updateStaff() {
    const formData: any = this.form.getRawValue();
    formData.userInfo.schoolId = '0010201056';
    formData.userInfo.nationality = 'TH';
    formData.addr1.schstaffid = `${this.staffId}`;
    formData.addr2.schstaffid = `${this.staffId}`;
    formData.edu1.schstaffid = `${this.staffId}`;
    if (formData && formData.edu2) formData.edu2.schstaffid = `${this.staffId}`;

    console.log('update formData = ', formData);

    formData.userInfo = replaceEmptyWithNull(formData.userInfo);
    formData.addr1 = replaceEmptyWithNull(formData.addr1);
    formData.addr2 = replaceEmptyWithNull(formData.addr2);
    formData.edu1 = replaceEmptyWithNull(formData.edu1);
    formData.edu2 = replaceEmptyWithNull(formData.edu2);

    this.staffService.updateStaff(formData).subscribe((res) => {
      //console.log('update staff result = ', res);
      this.snackBar.open('แก้ไขข้อมูลสำเร็จ', 'ปิด', {
        duration: 2000,
      });
    });
  }

  insertStaff() {
    const formData: any = this.form.getRawValue();
    formData.userInfo.schoolId = '0010201056';
    formData.userInfo.nationality = 'TH';
    formData.userInfo.createDate = new Date().toISOString().split('.')[0];
    formData.addr1.addressType = 1;
    formData.addr2.addressType = 2;

    console.log('insert formData = ', formData);
    this.staffService.addStaff(formData).subscribe((res) => {
      console.log('add staff result = ', res);
      this.snackBar.open('บันทึกข้อมูลสำเร็จ', 'ปิด', {
        duration: 2000,
      });
      this.router.navigate(['/staff-management', 'staff-person-info', res.id]);
    });
  }

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
  }

  nextPage() {
    this.router.navigate([
      '/staff-management',
      'staff-teaching-info',
      this.staffId,
    ]);
    //this.router.navigate(['/staff-management', 'edit-staff', this.staffId]);
  }

  cancel() {
    this.router.navigate(['/staff-management', 'list']);
  }

  save() {
    if (this.staffId) {
      this.updateStaff();
    } else {
      this.insertStaff();
    }
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
        this.onCompleted();
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

  get addr1(): any {
    return this.form.controls.addr1;
  }

  get addr2(): any {
    return this.form.controls.addr2;
  }
}
