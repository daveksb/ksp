import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { FormMode, KspRequest } from '@ksp/shared/interface';
import { EMPTY, switchMap } from 'rxjs';
import localForage from 'localforage';
import { encrypt, thaiDate } from '@ksp/shared/utility';
import { RequestService } from '@ksp/shared/service';

@Component({
  templateUrl: './register-password.component.html',
  styleUrls: ['./register-password.component.scss'],
})
export class RegisterPasswordComponent implements OnInit {
  eyeIconClicked = false;
  eyeIconClickedSecond = false;

  mode: FormMode = 'edit';
  school: any;
  address: any;
  coordinator: any;
  savingData: any;

  form = this.fb.group({
    password: [null, [Validators.required, Validators.minLength(8)]],
    repassword: [null, [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private requestService: RequestService
  ) {}

  get disableBtn() {
    const { password, repassword } = this.form.getRawValue();
    return password !== repassword || !password || !repassword;
  }

  ngOnInit(): void {
    this.loadStoredData();
  }

  clearStoredData() {
    localForage.removeItem('registerSelectedSchool');
    localForage.removeItem('registerUserInfoFormValue');
    localForage.removeItem('registerCoordinatorInfoFormValue');
  }

  loadStoredData() {
    localForage.getItem('registerSelectedSchool').then((res: any) => {
      this.school = res;
      this.address = `บ้านเลขที่ ${res.address} ซอย ${res?.street ?? ''} หมู่ ${
        res?.moo ?? ''
      } ถนน ${res?.road ?? ''} ตำบล ${res.tumbon} อำเภอ ${
        res.amphurname
      } จังหวัด ${res.provincename}`;
    });

    localForage.getItem('registerUserInfoFormValue').then((res) => {
      this.savingData = res;
    });

    localForage.getItem('registerCoordinatorInfoFormValue').then((res) => {
      this.coordinator = res;
    });
  }

  confirmCancelDialog() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยกเลิกรายการใบคำขอ
        ใช่หรือไม่?`,
        btnLabel: 'ยืนยัน',
      },
    });

    dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.cancelCompleteDialog();
      }
    });
  }

  cancelCompleteDialog() {
    const dialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: 'ยกเลิกรายการสำเร็จ',
      },
    });

    dialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/login']);
      }
    });
  }

  back() {
    this.router.navigate(['register', 'requester']);
  }

  async save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่?`,
        subTitle: `คุณยืนยันข้อมูลและส่งเรื่องเพื่อขออนุมัติ
        ใช่หรือไม่`,
        schoolCode: `รหัสเข้าใช้งาน(รหัสโรงเรียน): ${this.school?.schoolid}`,
        btnLabel: 'บันทึก',
      },
    });
    const password = await encrypt(this.form?.value?.password);
    confirmDialog.componentInstance.confirmed
      .pipe(
        switchMap((res) => {
          if (res) {
            const payload: KspRequest = {
              ...this.savingData,
              coordinatorinfo: JSON.stringify({
                ...this.coordinator,
                password,
              }),
            };
            payload.ref1 = '2';
            payload.ref2 = '01';
            payload.ref3 = '5';
            payload.systemtype = '2';
            payload.requesttype = '1';
            payload.careertype = '5';
            payload.process = '1';
            payload.status = '1';
            payload.schoolid = this.school.schoolid;
            payload.schoolname = this.school.schoolname;
            payload.bureauid = this.school.bureauid;
            //console.log('payload = ', payload);
            return this.requestService.schCreateRequest(payload);
            //return EMPTY;
          }
          return EMPTY;
        })
      )
      .subscribe((res: any) => {
        if (res) {
          const requestNo = res?.requestno;
          this.submitCompleteDialog(requestNo);
        }
      });
  }

  submitCompleteDialog(requestNo: string) {
    const dialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: `ยืนยันข้อมูลสำเร็จ`,
        content: `วันที่ : ${thaiDate(new Date())}
        เลขที่ใบคำขอ : ${requestNo}`,
        subContent: `กรุณาตรวจสอบสถานะใบคำขอผ่านทางอีเมล
        ผู้ที่ลงทะเบียนภายใน 3 วันทำการ`,
      },
    });

    dialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.clearStoredData();
        this.router.navigate(['/login']);
      }
    });
  }
}
