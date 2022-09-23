import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import localForage from 'localforage';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { UniversitySearchComponent } from '@ksp/shared/search';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { GeneralInfoService, UniRequestService } from '@ksp/shared/service';
import { thaiDate } from '@ksp/shared/utility';
import { RequestPageType } from '@ksp/shared/constant';

@Component({
  templateUrl: './uni-register-coordinator.component.html',
  styleUrls: ['./uni-register-coordinator.component.scss'],
})
export class UniRegisterCoordinatorComponent implements OnInit {
  requestDate = thaiDate(new Date());
  form = this.fb.group({
    universityInfo: [{}],
    coordinator: []
  });
  saveData: any;
  prefixName$!: Observable<any>;
  uniType$!: Observable<any>;
  occupyList$!: Observable<any>;
  requestNo: string = '';
  uploadFileList = [
    {
      name: 'หนังสือแต่งตั้งผู้ประสานงาน',
      fileId: '',
      fileName: ''
    },
    {
      name: 'สำเนาบัตรประชาชน',
      fileId: '',
      fileName: ''
    },
  ];
  requesttype = 1;
  systemtype = 3;
  currentprocess = 1;
  uniqueTimestamp: any = '';
  pageType = RequestPageType;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private requestService: UniRequestService
  ) {}

  ngOnInit(): void {
    this.uniqueTimestamp = `${new Date().getTime()}`;
    localForage.getItem('registerUserForm').then((res:any) => {
      if (res) {
        console.log(res)
        this.form.patchValue({
          universityInfo: {
            uniid: res.uniid,
            unitype: res.unitype,
            institution: res.institution,
            affiliation: res.affiliation
          }
        });
        this.saveData = res;
      }
    });
    localForage.getItem('registerCoordinatorForm').then((res:any) => {
      if (res) {
        this.form.patchValue({
          coordinator: res.coordinator
        });
      }
    });
    this.prefixName$ = this.generalInfoService.getPrefix();
    this.uniType$ = this.generalInfoService.getUniversityType();
    this.occupyList$ = this.generalInfoService.getOccupy();
  }

  search() {
    const dialogRef = this.dialog.open(UniversitySearchComponent, {
      width: '1200px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  prevPage() {
    localForage.setItem('registerCoordinatorForm', this.form.getRawValue());
    this.router.navigate(['/', 'register', 'requester']);
  }

  cancel() {
    localForage.removeItem('registerUserForm')
    this.router.navigate(['/', 'login']);
  }

  confirm() {
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
          console.log(this.saveData, this.form.getRawValue())
          const fileUpload = this.uploadFileList.map((file) => file.fileId || null);
          const payload = {
            ...this.saveData,
            coordinatorinfo: JSON.stringify(this.form.value.coordinator),
            fileinfo: JSON.stringify({ fileUpload })
          };
          payload.ref1 = '3';
          payload.ref2 = '01';
          payload.ref3 = '5';
          payload.systemtype = this.systemtype;
          payload.requesttype = this.requesttype;
          payload.currentprocess = this.currentprocess;
          return this.requestService.createRequest(payload);
        }
        return EMPTY;
      })
    )
    .subscribe((res) => {
      if (res) {
        const requestNo = res?.requestno;
        this.onConfirmed(requestNo);
      }
    });
  }

  onConfirmed(requestNo: string) {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: 'ยืนยันข้อมูลสำเร็จ',
        content: `วันที่ : ${this.requestDate}
        เลขที่ใบคำขอ : ${requestNo}`,
        subContent: `กรุณาตรวจสอบสถานะใบคำขอหรือรหัสเข้าใช้งาน
        ผ่านทางอีเมลผู้ที่ลงทะเบียนภายใน 3 วันทำการ`,
      },
    });
    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        localForage.setItem('registerCoordinatorInfoFormValue', this.form.value);
        this.router.navigate(['/', 'login']);
      }
    });
  }
}
