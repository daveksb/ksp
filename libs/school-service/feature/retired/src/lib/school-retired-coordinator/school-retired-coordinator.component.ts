import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import {
  FileGroup,
  KspRequest,
  Prefix,
  SchInfo,
  SchUser,
} from '@ksp/shared/interface';
import { GeneralInfoService, SchoolRequestService } from '@ksp/shared/service';
import {
  formatRequestNo,
  getCookie,
  replaceEmptyWithNull,
  thaiDate,
} from '@ksp/shared/utility';
import localForage from 'localforage';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'ksp-school-retired-coordinator',
  templateUrl: './school-retired-coordinator.component.html',
  styleUrls: ['./school-retired-coordinator.component.scss'],
})
export class SchoolRetiredCoordinatorComponent implements OnInit {
  reasoninfo: any;
  schoolId = getCookie('schoolId');
  school = new SchInfo();
  selectUser!: SchUser;
  userInfoFormType: number = UserInfoFormType.thai;
  prefixList$!: Observable<Prefix[]>;
  uniqueNo!: string;
  fileId!: number;
  fileUploadValid = false;

  retiredFiles: FileGroup[] = [
    { name: 'หนังสือถอดถอนผู้ประสานงาน', files: [] },
  ];
  form = this.fb.group({
    coordinatorTnfo: [],
  });

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private requestService: SchoolRequestService
  ) {}

  ngOnInit() {
    this.uniqueNo = uuidv4();
    this.getList();
    this.getStoreData();
  }

  onUploadComplete(evt: any) {
    this.fileId = evt.length;
    //console.log('this.fileId = ', evt);
  }

  prevPage() {
    this.router.navigate(['/retired-user', 'requester']);
  }

  getList() {
    this.prefixList$ = this.generalInfoService.getPrefix();
  }

  getStoreData() {
    localForage.getItem('retireReasonInfoFormValue').then((res) => {
      this.reasoninfo = res;
    });
    localForage.getItem('retiredSelectedSchool').then((res: any) => {
      this.school = res;
    });
    localForage.getItem('retiredSelectedUser').then((res: any) => {
      this.selectUser = res;
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
          //console.log('user = ', this.selectUser);
          if (res) {
            const coordinatorForm: any =
              this.form.controls.coordinatorTnfo.value;
            const request: KspRequest = new KspRequest();
            request.ref1 = '2';
            request.ref2 = '02';
            request.ref3 = '5';
            request.systemtype = '2';
            request.requesttype = '2';
            request.careertype = '5';
            request.process = `1`;
            request.status = `1`;
            request.firstnameth = this.selectUser.firstnameth;
            request.lastnameth = this.selectUser.lastnameth;
            request.contactphone = this.selectUser.schmobile;
            request.userid = this.selectUser.schmemberid;
            request.schoolid = this.schoolId;
            request.schoolname = this.school.schoolname;
            request.schooladdrinfo = JSON.stringify(this.school.provincename);
            request.reasoninfo = JSON.stringify(this.reasoninfo);
            request.coordinatorinfo = JSON.stringify(coordinatorForm);
            const payload = replaceEmptyWithNull(request);
            return this.requestService.schCreateRequest(payload);
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

  completeDialog(requestno: string) {
    const dialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: 'ยืนยันข้อมูลสำเร็จ',
        content: `วันที่ : ${thaiDate(new Date())}
        เลขที่ใบคำขอ : ${formatRequestNo(requestno)} `,
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
