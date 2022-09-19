import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { FormMode } from '@ksp/shared/interface';
import { GeneralInfoService, RequestService } from '@ksp/shared/service';
import { EMPTY, switchMap } from 'rxjs';
import localForage from 'localforage';
import { encrypt, thaiDate } from '@ksp/shared/utility';

@Component({
  templateUrl: './register-password.component.html',
  styleUrls: ['./register-password.component.scss'],
})
export class RegisterPasswordComponent implements OnInit {
  form = this.fb.group({
    password: [],
    repassword:[],
  });
  savingData: any;
  requestDate = thaiDate(new Date());
  requestNumber = '';

  mode: FormMode = 'edit';
  school: any;
  coordinator:any;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private requestService: RequestService
  ) {}
  get disable() {
    const { password , repassword } = this.form.getRawValue()
    return password !== repassword || !password || !repassword
  }
  ngOnInit(): void {
   localForage.getItem('registerSelectedSchool').then((res) => {
      this.school = res;
    });

    localForage.getItem('registerUserInfoFormValue').then((res) => {
      this.savingData = res;
    });

    localForage.getItem('registerCoordinatorInfoFormValue').then((res) => {
      this.coordinator = res;
    });
  }

  cancel() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยกเลิกรายการใบคำขอ
        ใช่หรือไม่?`,
        btnLabel: 'ยืนยัน',
      },
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onConfirmed();
      }
    });
  }

  onConfirmed() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: 'ยกเลิกรายการสำเร็จ',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'login']);
      }
    });
  }

  back() {
    this.router.navigate(['register', 'requester']);
  }

  async save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่?`,
        subTitle: `คุณยืนยันข้อมูลและส่งเรื่องเพื่อขออนุมัติ
        ใช่หรือไม่`,
        schoolCode: `รหัสเข้าใช้งาน(รหัสโรงเรียน): ${this.school?.schoolId}`,
        btnLabel: 'บันทึก',
      },
    });
    const password = await encrypt(this.form?.value?.password)
    confirmDialog.componentInstance.confirmed
      .pipe(
        switchMap((res) => {
          if (res) {
            console.log(password)
            const payload = {
              ...this.savingData,
              coordinatorinfo: JSON.stringify({...this.coordinator,password}),
            };
            payload.ref1 = '2';
            payload.ref2 = '01';
            payload.ref3 = '5';
            payload.systemtype = '2';
            payload.requesttype = '1';
            payload.subtype = '5';
            payload.currentprocess = '1';
            payload.requestStatus = '1';
            return this.requestService.createRequest(payload);
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res) {
          const requestNo = res?.requestno;
          this.showCompleteDialog(requestNo);
        }
      });
  }

  showCompleteDialog(requestNo: string) {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '375px',
      data: {
        header: `ยืนยันข้อมูลสำเร็จ`,
        content: `วันที่ : ${this.requestDate}
        เลขที่ใบคำขอ : ${requestNo}`,
        subContent: `กรุณาตรวจสอบสถานะใบคำขอผ่านทางอีเมล
        ผู้ที่ลงทะเบียนภายใน 3 วันทำการ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        localForage.removeItem('registerSelectedSchool');
        localForage.removeItem('registerUserInfoFormValue');
        localForage.removeItem('registerCoordinatorInfoFormValue');
        this.router.navigate(['/login']);
      }
    });
  }
}
