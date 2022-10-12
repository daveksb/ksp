import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FileGroup, FormMode, KspRequest } from '@ksp/shared/interface';
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
import { formatDate, mapMultiFileInfo, thaiDate } from '@ksp/shared/utility';
import { v4 as uuidv4 } from 'uuid';

@UntilDestroy()
@Component({
  templateUrl: './foreign-teacher-id-request.component.html',
  styleUrls: ['./foreign-teacher-id-request.component.scss'],
})
export class ForeignTeacherIdRequestComponent implements OnInit {
  uniqueNo!: string;
  bureauName = '';
  schoolId = '0010201056';
  schoolName = '';
  address = '';
  showCancelButton!: boolean;
  mode: FormMode = 'edit';
  prefixList$!: Observable<any>;
  countries$!: Observable<any>;
  visaTypeList$!: Observable<any>;
  //requestNo = '';
  //requestDate = thaiDate(new Date());
  requestId!: number;
  request: KspRequest = new KspRequest();

  form = this.fb.group({
    foreignTeacher: [],
    visainfo: [],
  });

  foreignFiles: FileGroup[] = [
    { name: '1.สำเนาหนังสือเดินทาง', files: [] },
  ] as FileGroup[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService,
    private requestService: RequestService,
    private schoolInfoService: SchoolInfoService
  ) {}

  get formValid() {
    return (
      !this.form.get('foreignTeacher')?.valid ||
      !this.form.get('visainfo')?.valid
    );
  }

  ngOnInit(): void {
    this.uniqueNo = uuidv4();
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
    this.requestService.schGetRequestById(id).subscribe((res) => {
      if (res) {
        this.mode = 'view';
        this.showCancelButton = Boolean(res.status);
        //this.requestDate = res.requestdate ?? '';

        /* res.birthdate = res.birthdate?.split('T')[0];
        res.passportstartdate = res.passportstartdate?.split('T')[0];
        res.passportenddate = res.passportenddate?.split('T')[0]; */

        //const visainfo = JSON.parse(atob(res.visainfo));
        //visainfo.passportenddate = visainfo.passportenddate?.split('T')[0];
        //res.fileinfo = JSON.parse(atob(res.fileinfo));

        /* if (res && res.fileinfo) {
          this.foreignFiles.forEach(
            (group, index) => (group.files = res.fileinfo[index])
          );
        }
        this.form.get('foreignTeacher')?.patchValue(res); */
        //this.form.controls['visainfo'].patchValue(visainfo);
      }
    });
  }

  cancel() {
    if (this.mode == 'view') {
      const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
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
        .subscribe(() => {
          this.onCancelCompleted();
        });
    } else {
      this.router.navigate(['/temp-license']);
    }
  }

  onCancelCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: 'ระบบทำการยกเลิกเรียบร้อย',
        content: `วันที่ : ${thaiDate(new Date())}
        เลขที่คำขอ : ${this.request.requestno}`,
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

  confirmDialog() {
    /*  if (
      !this.form.get('foreignTeacher')?.valid ||
      !this.form.get('visainfo')?.valid
    )
      return; */
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
          if (res && this.form.value.foreignTeacher) {
            const userInfo: Partial<KspRequest> =
              this.form.value.foreignTeacher;

            userInfo.ref1 = '2';
            userInfo.ref2 = '04';
            userInfo.ref3 = '5';
            userInfo.systemtype = '2';
            userInfo.requesttype = '4';
            userInfo.careertype = '5';
            userInfo.schoolid = this.schoolId;
            userInfo.process = `1`;
            userInfo.status = `1`;
            userInfo.birthdate = formatDate(userInfo.birthdate);
            userInfo.passportstartdate = formatDate(userInfo.passportstartdate);
            userInfo.passportenddate = formatDate(userInfo.passportenddate);
            userInfo.visaexpiredate = formatDate(userInfo.visaexpiredate);
            //userInfo.visainfo = JSON.stringify(this.form.value.visainfo);
            /* userInfo.fileinfo = JSON.stringify(
              mapMultiFileInfo(this.foreignFiles)
            ); */
            console.log('userInfo = ', userInfo);
            return this.requestService.schCreateRequest(userInfo);
          }
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.onCompleted();
        //console.log(res);
      });
  }

  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
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
      .subscribe((res) => {
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
