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
  KspKuruspa,
  VisaType,
} from '@ksp/shared/interface';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { FormBuilder } from '@angular/forms';
import {
  formatDate,
  genKuruspaNo,
  parseJson,
  replaceEmptyWithNull,
  thaiDate,
} from '@ksp/shared/utility';
import { SchoolRequestSubType } from '@ksp/shared/constant';
import {
  AddressService,
  ERequestService,
  GeneralInfoService,
} from '@ksp/shared/service';
import { EMPTY, Observable, switchMap } from 'rxjs';
import _ from 'lodash';

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
    data.birthdate = formatDate(data.birthdate);

    if (this.requestSubType === SchoolRequestSubType.อื่นๆ) {
      data.birthdate = formatDate(data.birthdate);
      data.passportstartdate = formatDate(data.passportstartdate);
      data.passportenddate = formatDate(data.passportenddate);
      data.visaexpiredate = formatDate(data.visaexpiredate);
    }
    const fileinfo = parseJson(data.fileinfo);
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

  confirm() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยืนยันข้อมูล
        และส่งใบคำขอ ใช่หรือไม่? `,
      },
    });

    const kuruspaNo = genKuruspaNo();

    dialog.componentInstance.confirmed
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
            return this.eRequestService.KspUpdateRequestProcess(payload);
          }
          return EMPTY;
        }),
        switchMap((res) => {
          const data: any = this.form.controls.verifydetail.value;
          if (res && data.result === '2') {
            const allowKey = Object.keys(new KspKuruspa());
            let payload = _.pick(
              this.requestData,
              allowKey
            ) as Partial<KspKuruspa>;
            payload.id = null;
            payload = replaceEmptyWithNull(payload);
            payload.createdate = formatDate(payload.createdate);
            payload.fileinfo = atob(payload?.fileinfo || '');
            payload.kuruspano = kuruspaNo;
            payload.requestid = this.requestData.requestid;
            return this.eRequestService.createKuruspaNumber(payload);
          }
          return EMPTY;
        }),
        switchMap((res) => {
          if (res) {
            return this.eRequestService.updateRequestKuruspaNo(
              this.requestData.requestid,
              kuruspaNo
            );
          }
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.onCompleted();
      });
  }

  onCompleted() {
    const dialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: `ยืนยันข้อมูลสำเร็จ`,
      },
    });

    dialog.componentInstance.completed.subscribe(() => {
      this.router.navigate(['/foreign-license', 'list']);
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
