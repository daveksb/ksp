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
  formatDatePayload,
  getCookie,
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
import { EMPTY, Observable, of, switchMap } from 'rxjs';
import _ from 'lodash';
import moment from 'moment';

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
  requestSubType = SchoolRequestSubType.ชาวต่างชาติ;
  checkedResult: any;
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
      if (res.status === '2') {
        this.checkedResult = verifyChoices[0].value;
      } else if (res.status === '3') {
        this.checkedResult = verifyChoices[1].value;
      }
      //console.log('checkResult = ', this.checkedResult);
    });
  }

  pathUserInfo(data: any) {
    data.birthdate = formatDate(data.birthdate);

    if (this.requestSubType === SchoolRequestSubType.ชาวต่างชาติ) {
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
    data.country = Number(data.country);
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
        ใช่หรือไม่? `,
      },
    });

    dialog.componentInstance.confirmed
      .pipe(
        switchMap((res) => {
          if (res) {
            const data: any = this.form.controls.verifydetail.value;
            const payload: KspApprovePayload = {
              requestid: this.requestData.requestid,
              process: '2',
              status: data?.result,
              detail: null, //`${data?.detail}`,
              systemtype: '4', // e-service
              userid: getCookie('userId'),
              paymentstatus: null,
            };
            return this.eRequestService.KspUpdateRequestProcess(payload);
          }
          return EMPTY;
        }),
        switchMap((res) => {
          const data: any = this.form.controls.verifydetail.value;
          //console.log('data 2 = ', data);
          if (res && data.result === '2') {
            let payload = new KspKuruspa();
            const countryCode = this.requestData.country ?? 0;
            const countryCode3digits = countryCode.toString().padStart(3, '0');

            payload.country = this.requestData.country;
            payload.countrycode = countryCode3digits;
            payload.requestno = this.requestData.requestno;
            payload.createdate = moment().format('yyyy-MM-DD');
            payload.expireddate = moment().add(2, 'years').format('yyyy-MM-DD');
            payload.visaclass = this.requestData.visaclass;
            payload.visatype = this.requestData.visatype;
            payload.visaexpireddate = this.requestData.visaexpiredate;
            payload.idcardno = this.requestData.idcardno;
            payload.passportno = this.requestData.passportno;
            payload.passportstartdate = this.requestData.passportstartdate;
            payload.passportenddate = this.requestData.passportenddate;
            payload.prefixth = this.requestData.prefixth;
            payload.firstnameth = this.requestData.firstnameth;
            payload.lastnameth = this.requestData.lastnameth;
            payload.prefixen = this.requestData.prefixen;
            payload.firstnameen = this.requestData.firstnameen;
            payload.lastnameen = this.requestData.lastnameen;
            payload.sex = this.requestData.sex;
            payload.birthdate = this.requestData.birthdate;
            payload.email = this.requestData.email;
            payload.position = this.requestData.position;
            payload.contactphone = this.requestData.contactphone;
            payload.nationality = this.requestData.nationality;
            payload.fileinfo = null; //this.requestData.fileinfo
            payload.bureauid = this.requestData.bureauid;
            payload.bureauname = this.requestData.bureauname;
            payload.schoolid = this.requestData.schoolid;
            payload.schoolname = this.requestData.schoolname;
            payload.schooladdress = this.requestData.schooladdress;
            payload.requestid = this.requestData.requestid;
            payload = replaceEmptyWithNull(payload);

            return this.eRequestService.createKuruspaNumber(
              formatDatePayload(payload)
            );
          }

          return of(false);
        }),
        switchMap((res) => {
          if (res) {
            return this.eRequestService.updateRequestKuruspaNo(
              this.requestData.requestid,
              res.returnkspid
            );
          }
          return of(false);
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
    name: '1. สำเนาหนังสือเดินทาง',
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
