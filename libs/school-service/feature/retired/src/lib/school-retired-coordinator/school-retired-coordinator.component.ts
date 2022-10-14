import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { FileGroup, KspRequest } from '@ksp/shared/interface';
import { GeneralInfoService, RequestService } from '@ksp/shared/service';
import { thaiDate } from '@ksp/shared/utility';
import localForage from 'localforage';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
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
  today = `${new Date()}`;
  schoolId = '0010201056';
  userInfoFormType: number = UserInfoFormType.thai;
  prefixList$!: Observable<any>;
  uniqueNo!: string;
  retiredFiles: FileGroup[] = [
    { name: 'หนังสือแต่งตั้งผู้ประสานงาน', files: [] },
  ];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private requestService: RequestService
  ) {}

  ngOnInit() {
    localForage.getItem('registerUserInfoFormValue').then((res) => {
      this.reasoninfo = res;
    });
    this.uniqueNo = uuidv4();
    this.getList();
  }

  prevPage() {
    this.router.navigate(['/retired-user', 'requester']);
  }

  getList() {
    this.prefixList$ = this.generalInfoService.getPrefix();
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
        this.cancelDialog();
      }
    });
  }

  confirmSubmitDialog() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่?`,
        subTitle: `คุณยืนยันข้อมูลและส่งเรื่องเพื่อขออนุมัติ
        ใช่หรือไม่`,
        btnLabel: 'บันทึก',
      },
    });

    dialog.componentInstance.confirmed
      .pipe(
        switchMap((res) => {
          if (res) {
            const form = this.form.value as any;
            const retiredInfo: KspRequest = form.retiredTnfo;
            retiredInfo.ref1 = '2';
            retiredInfo.ref2 = '02';
            retiredInfo.ref3 = '5';
            retiredInfo.systemtype = '2';
            retiredInfo.requesttype = '2';
            retiredInfo.careertype = '5';
            retiredInfo.process = `1`;
            retiredInfo.status = `1`;
            retiredInfo.schoolid = this.schoolId;
            retiredInfo.reasoninfo = JSON.stringify(this.reasoninfo);
            return this.requestService.schCreateRequest(retiredInfo);
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res) {
          this.completeDialog(res?.requestno);
        }
      });
  }

  cancelDialog() {
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

  completeDialog(requestno: any) {
    const dialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: 'ยืนยันข้อมูลสำเร็จ',
        content: `วันที่ : ${thaiDate(new Date())}
        เลขที่ใบคำขอ : ${requestno} `,
        subContent: `กรุณาตรวจสอบสถานะใบคำขอหรือรหัสเข้าใช้งาน
        ผ่านทางอีเมลผู้ที่ลงทะเบียนภายใน 3 วันทำการ`,
      },
    });

    dialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/login']);
      }
    });
  }
}
