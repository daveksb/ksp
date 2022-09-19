import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { GeneralInfoService, RequestService } from '@ksp/shared/service';
import { thaiDate } from '@ksp/shared/utility';
import localForage from 'localforage';
import { EMPTY, Observable, switchMap } from 'rxjs';
@Component({
  selector: 'ksp-school-retired-coordinator',
  templateUrl: './school-retired-coordinator.component.html',
  styleUrls: ['./school-retired-coordinator.component.scss'],
})
export class SchoolRetiredCoordinatorComponent implements OnInit {
  form = this.fb.group({
    retiredTnfo: [],
  });
  reasoninfo: any;
  requestNo = '';
  today = thaiDate(new Date());  
  schoolId = '0010201056';
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private requestService: RequestService
  ) {}
  userInfoFormType: number = UserInfoFormType.thai;
  retiredFiles = ['หนังสือแต่งตั้งผู้ประสานงาน'];
  prefixList$!: Observable<any>;

  ngOnInit() {
    localForage.getItem('registerUserInfoFormValue').then((res) => {
      this.reasoninfo = res;
    });
    this.getList();
  }

  prevPage() {
    this.router.navigate(['/', 'retired-user', 'requester']);
  }
  getList() {
    this.form.valueChanges.subscribe((res) => console.log(res));
    this.prefixList$ = this.generalInfoService.getPrefix();
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
        this.onConfirmed1();
      }
    });
  }

  onConfirmed1() {
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

  save() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่?`,
        subTitle: `คุณยืนยันข้อมูลและส่งเรื่องเพื่อขออนุมัติ
        ใช่หรือไม่`,
        btnLabel: 'บันทึก',
      },
    });

    dialogRef.componentInstance.confirmed
      .pipe(
        switchMap((res) => {
          if (res) {
            const { retiredTnfo } = this.form.value as any;
            retiredTnfo.ref1 = '2';
            retiredTnfo.ref2 = '02';
            retiredTnfo.ref3 = '5';
            retiredTnfo.systemtype = '2';
            retiredTnfo.requesttype = '4';
            retiredTnfo.subtype = '5';
            retiredTnfo.currentprocess = `1`;
            retiredTnfo.requestStatus = `1`;
            retiredTnfo.schoolid = this.schoolId;
            retiredTnfo.reasoninfo = JSON.stringify(this.reasoninfo);
            return this.requestService.createRequest(retiredTnfo);
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res) {
          this.onConfirmed2(res?.requestno);
        }
      });
  }

  onConfirmed2(requestno: any) {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: 'ยืนยันข้อมูลสำเร็จ',
        content: `วันที่ : ${this.today}
        เลขที่ใบคำขอ : ${requestno} `,
        subContent: `กรุณาตรวจสอบสถานะใบคำขอหรือรหัสเข้าใช้งาน
        ผ่านทางอีเมลผู้ที่ลงทะเบียนภายใน 3 วันทำการ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'login']);
      }
    });
  }
}
