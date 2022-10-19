import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Country,
  FileGroup,
  FormMode,
  KspApprovePayload,
  KspRequest,
  Prefix,
  VisaType,
} from '@ksp/shared/interface';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { FormBuilder } from '@angular/forms';
import { formatDate, thaiDate } from '@ksp/shared/utility';
import { SchoolRequestSubType } from '@ksp/shared/constant';
import {
  AddressService,
  ERequestService,
  GeneralInfoService,
} from '@ksp/shared/service';
import { EMPTY, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'ksp-foreign-license-detail',
  templateUrl: './foreign-license-detail.component.html',
  styleUrls: ['./foreign-license-detail.component.scss'],
})
export class ForeignLicenseDetailComponent implements OnInit {
  choices: string[] = ['ครบถ้วน และถูกต้อง', 'ไม่ครบถ้วน และไม่ถูกต้อง'];
  @Input() mode: FormMode = 'view';
  foreignInfo = ['1.สำเนาหนังสือเดินทาง'];

  today = thaiDate(new Date());
  prefixList$!: Observable<Prefix[]>;
  countries$!: Observable<Country[]>;
  visaTypeList$!: Observable<VisaType[]>;
  verifyChoice = verifyChoices;
  evidenceFile = evidenceFiles;
  requestData = new KspRequest();
  requestSubType = SchoolRequestSubType.อื่นๆ;

  form = this.fb.group({
    foreignTeacherInfo: [],
    foreignVisaInfo: [],
    verifydetail: [],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private eRequestService: ERequestService,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.checkRequestId();
    this.getList();
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      const requestId = Number(params.get('id'));
      if (requestId) {
        this.loadRequestFromId(requestId);
      }
    });
  }

  loadRequestFromId(id: number) {
    this.eRequestService.getKspRequestById(id).subscribe((res) => {
      this.requestData = res;
      this.pathUserInfo(res);
    });
  }

  pathUserInfo(data: any) {
    data.birthdate = data.birthdate.split('T')[0];

    if (this.requestSubType === SchoolRequestSubType.อื่นๆ) {
      data.birthdate = formatDate(data.birthdate);
      data.passportstartdate = formatDate(data.passportstartdate);
      data.passportenddate = formatDate(data.passportenddate);
      data.visaexpiredate = formatDate(data.visaexpiredate);
    }
    const fileinfo = JSON.parse(atob(data?.fileinfo || ''));
    if (fileinfo) {
      this.evidenceFile.forEach(
        (group, index) => (group.files = fileinfo[index])
      );
    }
    this.form.controls.foreignTeacherInfo.patchValue(data);
    this.form.controls.foreignVisaInfo.patchValue(data);
  }

  getList() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.countries$ = this.addressService.getCountry();
    this.visaTypeList$ = this.generalInfoService.getVisaType();
  }

  cancel() {
    this.router.navigate(['/foreign-license', 'list']);
  }

  onConfirmed() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยืนยันข้อมูล
        และส่งใบคำขอ ใช่หรือไม่? `,
      },
    });

    confirmDialog.componentInstance.confirmed
      .pipe(
        switchMap((res) => {
          if (res) {
            const data = this.form.controls.verifydetail.value as any;
            const payload: KspApprovePayload = {
              requestid: this.requestData.requestid,
              process: '2',
              status: data.result,
              detail: data.detail,
              systemtype: '2', // school
              userid: null,
              paymentstatus: null,
            };
            return this.eRequestService.KspApproveRequest(payload);
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res) {
          this.onCompleted();
        }
      });
  }

  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: `ยืนยันข้อมูลสำเร็จ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/foreign-license', 'list']);
      }
    });
  }
}

const evidenceFiles: FileGroup[] = [
  {
    name: '1.สำเนาสัญญาจ้าง',
    files: [],
  },
];

const verifyChoices = [
  {
    name: 'อนุมัติ',
    value: 2,
  },
  {
    name: 'ไม่อนุมัติ',
    value: 3,
  },
];
