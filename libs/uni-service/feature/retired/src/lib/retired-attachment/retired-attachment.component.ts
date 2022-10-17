import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RequestPageType } from '@ksp/shared/constant';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { mapMultiFileInfo, thaiDate } from '@ksp/shared/utility';
import {
  GeneralInfoService,
  UniInfoService,
  UniRequestService,
} from '@ksp/shared/service';
import { EMPTY, Observable, switchMap } from 'rxjs';
import localForage from 'localforage';
import { v4 as uuidv4 } from 'uuid';
import { FileGroup } from '@ksp/shared/interface';

@Component({
  selector: 'uni-service-retired-attachment',
  templateUrl: './retired-attachment.component.html',
  styleUrls: ['./retired-attachment.component.scss'],
})
export class RetiredAttachmentComponent implements OnInit {
  form = this.fb.group({
    coordinator: [],
  });
  prefixName$!: Observable<any>;
  occupyList$!: Observable<any>;
  uniqueTimestamp: any = '';
  pageType = RequestPageType;
  requesttype = 2;
  reasoninfo: any;
  userInfo: any;
  today = thaiDate(new Date());

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private requestService: UniRequestService,
    private uniinfoService: UniInfoService
  ) {}

  retiredFiles: FileGroup[] = [
    { name: 'หนังสือแต่งตั้งผู้ประสานงาน', files: [] },
    { name: 'สำเนาบัตรประชาชน', files: [] },
  ] as FileGroup[];

  ngOnInit() {
    this.uniqueTimestamp = uuidv4();
    this.prefixName$ = this.generalInfoService.getPrefix();
    this.occupyList$ = this.uniinfoService.getOccupy();
    localForage.getItem('retireReasonData').then((res) => {
      this.reasoninfo = res;
    });
    localForage.getItem('userSelectedData').then((res: any) => {
      if (res) {
        this.userInfo = res;
      }
    });
    localForage.getItem('retireCoordinatorInfo').then((res: any) => {
      if (res) {
        this.form.patchValue({
          coordinator: res.coordinator,
        });
      }
    });
  }

  prevPage() {
    localForage.setItem('retireCoordinatorInfo', this.form.getRawValue());
    this.router.navigate(['/', 'retired', 'reason']);
  }

  cancel() {
    this.router.navigate(['/', 'login']);
  }

  save() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
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
            const fileUpload = mapMultiFileInfo(this.retiredFiles);
            const payload = {
              ...this.userInfo,
              coordinatorinfo: JSON.stringify(this.form.value.coordinator),
              fileinfo: JSON.stringify({ fileUpload }),
              reasoninfo: JSON.stringify(this.reasoninfo),
            };
            payload.ref1 = '3';
            payload.ref2 = '02';
            payload.ref3 = '5';
            payload.systemtype = '3';
            payload.requesttype = '2';
            payload.subtype = '5';
            payload.currentprocess = `1`;
            payload.requeststatus = `1`;
            payload.requestprocess = '2';
            payload.schoolid = this.userInfo.uniid;
            payload.uniquetimestamp = this.uniqueTimestamp;
            return this.requestService.createRequestKsp(payload);
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res) {
          this.onConfirmed(res?.requestno);
        }
      });
  }

  onConfirmed(requestno: any) {
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
        localForage.removeItem('retireReasonData');
        localForage.removeItem('userSelectedData');
        localForage.removeItem('retireCoordinatorInfo');
        this.router.navigate(['/', 'login']);
      }
    });
  }
}
