import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormMode } from '@ksp/shared/interface';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { FormBuilder } from '@angular/forms';
import { EMPTY, Observable, switchMap } from 'rxjs';
import {
  AddressService,
  GeneralInfoService,
  RequestService,
  SchoolInfoService,
} from '@ksp/shared/service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { mapMultiFileInfo, thaiDate } from '@ksp/shared/utility';
import { v4 as uuidv4 } from 'uuid';
import { FileGroup } from '@ksp/shared/constant';

@UntilDestroy()
@Component({
  templateUrl: './foreign-teacher-id-request.component.html',
  styleUrls: ['./foreign-teacher-id-request.component.scss'],
})
export class ForeignTeacherIdRequestComponent implements OnInit {
  uniqueTimestamp!: string;

  form = this.fb.group({
    foreignTeacher: [],
    visainfo: [],
  });
  bureauName = '';
  schoolId = '0010201056';
  schoolName = '';
  address = '';
  requestDate = thaiDate(new Date());
  showCancelButton!: boolean;
  mode: FormMode = 'edit';
  prefixList$!: Observable<any>;
  countries$!: Observable<any>;
  visaTypeList$!: Observable<any>;
  foreignFiles = [{ name: '1.สำเนาหนังสือเดินทาง', files: [] }] as FileGroup[];
  requestNumber = '';
  requestId!: number;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService,
    private requestService: RequestService,
    private schoolInfoService: SchoolInfoService,
    private route: ActivatedRoute //private ref: ChangeDetectorRef
  ) {}
  get formValid() {
    return (
      !this.form.get('foreignTeacher')?.valid ||
      !this.form.get('visainfo')?.valid
    );
  }

  ngOnInit(): void {
    this.uniqueTimestamp = uuidv4();
    this.getList();
    this.checkRequestId();
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        this.loadRequestData(this.requestId);
      }
    });
  }

  loadRequestData(id: number) {
    this.requestService.getRequestById(id).subscribe((res: any) => {
      if (res) {
        this.mode = 'view';
        this.showCancelButton = Boolean(+res.requeststatus);
        this.requestDate = thaiDate(new Date(`${res.requestdate}`));
        this.requestNumber = res.requestno;
        res.birthdate = res.birthdate?.split('T')[0];
        res.passportstartdate = res.passportstartdate?.split('T')[0];
        res.passportenddate = res.passportenddate?.split('T')[0];
        const visainfo = JSON.parse(atob(res.visainfo));
        visainfo.passportenddate = visainfo.passportenddate?.split('T')[0];
        res.fileinfo = JSON.parse(atob(res.fileinfo));

        if (res && res.fileinfo) {
          this.foreignFiles.forEach(
            (group, index) => (group.files = res.fileinfo[index])
          );
        }
        this.form.get('foreignTeacher')?.patchValue(res);
        this.form.controls['visainfo'].patchValue(visainfo);
      }
    });
  }

  cancel() {
    if (this.mode == 'view') {
      const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
        width: '350px',
        data: {
          title: `คุณต้องการยกเลิกการยื่นคำขอ
          ใช่หรือไม่? `,
          btnLabel: 'ยืนยัน',
        },
      });

      confirmDialog.componentInstance.confirmed
        .pipe(
          switchMap((res) => {
            if (res) {
              const payload = {
                id: `${this.requestId}`,
                requeststatus: '0',
              };
              return this.requestService.cancelRequest(payload);
            }
            return EMPTY;
          })
        )
        .subscribe((res) => {
          this.onCancelCompleted();
        });
    } else {
      this.router.navigate(['/temp-license']);
    }
  }

  onCancelCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: 'ระบบทำการยกเลิกเรียบร้อย',
        content: `วันที่ : ${thaiDate(new Date())}
        เลขที่คำขอ : ${this.requestNumber}`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/temp-license', 'list']);
      }
    });
  }

  onClickPrev() {
    if (this.mode == 'view') {
      this.router.navigate(['/temp-license']);
    }
  }

  onConfirmed() {
    if (
      !this.form.get('foreignTeacher')?.valid ||
      !this.form.get('visainfo')?.valid
    )
      return;
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูล
        และส่งใบคำขอ ใช่หรือไม่? `,
        btnLabel: 'ยืนยัน',
      },
    });
    confirmDialog.componentInstance.confirmed
      .pipe(
        switchMap((res) => {
          if (res) {
            // call API
            const userInfo = this.form.value.foreignTeacher as any;
            userInfo.ref1 = '2';
            userInfo.ref2 = '04';
            userInfo.ref3 = '5';
            userInfo.systemtype = '2';
            userInfo.requesttype = '4';
            userInfo.subtype = '5';
            userInfo.schoolid = this.schoolId;
            userInfo.currentprocess = `1`;
            userInfo.requeststatus = `1`;
            userInfo.visainfo = JSON.stringify(this.form.value.visainfo);
            userInfo.fileinfo = JSON.stringify(
              mapMultiFileInfo(this.foreignFiles)
            );
            return this.requestService.createRequest(userInfo);
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
        this.onCompleted();
        console.log(res);
      });
  }

  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '375px',
      data: {
        header: `ยืนยันข้อมูลสำเร็จ`,
        buttonLabel: 'กลับสู่หน้าหลัก',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/temp-license', 'list']);
      }
    });
  }

  getList() {
    this.schoolInfoService
      .getSchoolInfo(this.schoolId)
      .pipe(untilDestroyed(this))
      .subscribe((res: any) => {
        this.schoolName = res.schoolName;
        this.bureauName = res.bureauName;
        this.address = `บ้านเลขที่ ${res.address} ซอย ${
          res?.street ?? ''
        } หมู่ ${res?.moo ?? ''} ถนน ${res?.road ?? ''} ตำบล ${
          res.tumbon
        } อำเภอ ${res.amphurName} จังหวัด ${res.provinceName}`;
      });
    this.countries$ = this.addressService.getCountry();
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.visaTypeList$ = this.generalInfoService.getVisaType();
  }
}
