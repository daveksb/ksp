import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormMode } from '@ksp/shared/interface';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { FormBuilder } from '@angular/forms';
import { parseJson, thaiDate } from '@ksp/shared/utility';
import { SchoolRequestSubType } from '@ksp/shared/constant';
import {
  AddressService,
  ERequestService,
  GeneralInfoService,
} from '@ksp/shared/service';
import { Observable } from 'rxjs';

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
  prefixList$!: Observable<any>;
  countries$!: Observable<any>;

  verifyChoice = verifyChoices;
  evidenceFile = evidenceFiles;
  requestNo = '';
  requestData: any;
  requestId!: number;
  requestSubType = SchoolRequestSubType.อื่นๆ;

  form = this.fb.group({
    foreignTeacherInfo: [],
    foreignVisaInfo: [],
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
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        this.loadRequestFromId(this.requestId);
      }
    });
  }

  loadRequestFromId(id: number) {
    this.eRequestService.getRequestById(id).subscribe((res: any) => {
      this.requestData = res;
      this.requestNo = res.requestno;
      //this.currentProcess = +res.currentprocess;
      //console.log('current process = ', this.currentProcess);
      this.pathUserInfo(res);
    });
  }

  pathUserInfo(data: any) {
    data.birthdate = data.birthdate.split('T')[0];

    if (this.requestSubType === SchoolRequestSubType.อื่นๆ) {
      data.passportstartdate = data.passportstartdate.split('T')[0];
      data.passportenddate = data.passportenddate.split('T')[0];
      //console.log('data = ', data);
      if (data?.visainfo) {
        const visa = parseJson(data?.visainfo);
        data.visaclass = visa.visaclass;
        data.visatype = visa.visatype;
        data.visaenddate = visa.visaenddate;
      }
      //console.log('data = ', data);
    }

    this.form.controls.foreignTeacherInfo.patchValue(data);
    this.form.controls.foreignVisaInfo.patchValue(data);
  }

  getList() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.countries$ = this.addressService.getCountry();
  }

  cancel() {
    this.router.navigate(['/foreign-license', 'list']);
  }

  onConfirmed() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูล
        และส่งใบคำขอ ใช่หรือไม่? `,
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onCompleted();
      }
    });
  }

  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
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

const evidenceFiles = [
  {
    name: '1.สำเนาสัญญาจ้าง',
    fileId: '',
  },
];

const verifyChoices = [
  {
    name: 'อนุมัติ',
    value: 1,
  },
  {
    name: 'ไม่อนุมัติ',
    value: 2,
  },
];
