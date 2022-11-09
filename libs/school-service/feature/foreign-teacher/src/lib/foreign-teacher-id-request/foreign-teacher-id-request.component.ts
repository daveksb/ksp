import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Country,
  FileGroup,
  FormMode,
  KspRequest,
  KspRequestProcess,
  Prefix,
  VisaType,
} from '@ksp/shared/interface';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { FormBuilder } from '@angular/forms';
import { EMPTY, Observable, switchMap } from 'rxjs';
import {
  AddressService,
  GeneralInfoService,
  SchoolInfoService,
  SchoolRequestService,
} from '@ksp/shared/service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  changeDate,
  formatDate,
  getCookie,
  mapMultiFileInfo,
  thaiDate,
} from '@ksp/shared/utility';
import { v4 as uuidv4 } from 'uuid';

@UntilDestroy()
@Component({
  templateUrl: './foreign-teacher-id-request.component.html',
  styleUrls: ['./foreign-teacher-id-request.component.scss'],
})
export class ForeignTeacherIdRequestComponent implements OnInit {
  uniqueNo!: string;
  bureauName = '';
  schoolId = getCookie('schoolId');
  schoolName = '';
  address = '';
  showCancelButton!: boolean;
  mode: FormMode = 'edit';
  prefixList$!: Observable<Prefix[]>;
  countries$!: Observable<Country[]>;
  visaTypeList$!: Observable<VisaType[]>;
  requestId!: number;
  requestData: KspRequest = new KspRequest();

  form = this.fb.group({
    foreignTeacher: [],
    visainfo: [],
  });

  foreignFiles: FileGroup[] = [{ name: '1.สำเนาหนังสือเดินทาง', files: [] }];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService,
    private requestService: SchoolRequestService,
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
        this.requestData.requestdate = res.requestdate ?? '';
        this.requestData.requestno = res.requestno ?? '';
        res.birthdate = formatDate(res.birthdate);
        res.passportstartdate = formatDate(res.passportstartdate);
        res.passportenddate = formatDate(res.passportenddate);
        res.visaexpiredate = formatDate(res.visaexpiredate);

        const fileinfo = JSON.parse(atob(res?.fileinfo || ''));

        if (fileinfo) {
          this.foreignFiles.forEach(
            (group, index) => (group.files = fileinfo[index])
          );
        }
        this.form.controls.foreignTeacher.patchValue(<any>res);
        this.form.controls.visainfo.patchValue(<any>res);
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
              const payload: KspRequestProcess = {
                id: `${this.requestId}`,
                process: `${this.requestData.process}`,
                status: '0',
                detail: null,
                userid: null,
                paymentstatus: null,
              };

              return this.requestService.schCancelRequest(payload);
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
    const dialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: 'ระบบทำการยกเลิกเรียบร้อย',
        content: `วันที่ : ${thaiDate(new Date())}
        เลขที่คำขอ : ${this.requestData.requestno}`,
      },
    });

    dialog.componentInstance.completed.subscribe((res) => {
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
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยืนยันข้อมูล
        และส่งใบคำขอ ใช่หรือไม่? `,
        btnLabel: 'ยืนยัน',
      },
    });
    dialog.componentInstance.confirmed
      .pipe(
        switchMap((res) => {
          if (res && this.form.value.foreignTeacher) {
            const userInfo: Partial<KspRequest> = this.form.value
              .foreignTeacher as any;

            userInfo.ref1 = '2';
            userInfo.ref2 = '04';
            userInfo.ref3 = '5';
            userInfo.isforeign = '1';
            userInfo.systemtype = '2';
            userInfo.requesttype = '4';
            userInfo.careertype = '5';
            userInfo.schoolid = this.schoolId;
            userInfo.process = `2`;
            userInfo.status = `1`;
            userInfo.birthdate = changeDate(userInfo.birthdate);
            userInfo.passportstartdate = changeDate(userInfo.passportstartdate);
            userInfo.passportenddate = changeDate(userInfo.passportenddate);
            const visaform = this.form.value.visainfo as any;
            userInfo.visaclass = visaform?.visaclass;
            userInfo.visatype = visaform?.visatype;
            userInfo.visaexpiredate = changeDate(visaform?.visaexpiredate);
            userInfo.bureauname = this.bureauName;
            userInfo.schoolid = this.schoolId;
            userInfo.schoolname = this.schoolName;
            userInfo.schooladdress = this.address;
            userInfo.fileinfo = JSON.stringify(
              mapMultiFileInfo(this.foreignFiles)
            );
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
      .subscribe((res: any) => {
        this.schoolName = res.schoolName;
        this.bureauName = res.bureauName;
        this.address = `บ้านเลขที่ ${res.address} ซอย ${
          res?.street ?? ''
        } หมู่ ${res?.moo ?? ''} ถนน ${res?.road ?? ''} ตำบล ${
          res.tumbon
        } อำเภอ ${res.amphurName} จังหวัด ${res.provinceName} รหัสไปรษณีย์ ${
          res.zipCode
        }`;
      });
    this.countries$ = this.addressService.getCountry();
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.visaTypeList$ = this.generalInfoService.getVisaType();
  }
}
