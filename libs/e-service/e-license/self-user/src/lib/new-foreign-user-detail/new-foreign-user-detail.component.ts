import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import {
  FormMode,
  KspApprovePayload,
  KspRequest,
  SelfMyInfo,
} from '@ksp/shared/interface';
import {
  AddressService,
  ERequestService,
  GeneralInfoService,
  MyInfoService,
} from '@ksp/shared/service';
import {
  formatDatePayload,
  getCookie,
  replaceEmptyWithNull,
} from '@ksp/shared/utility';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'ksp-new-foreign-user-detail',
  templateUrl: './new-foreign-user-detail.component.html',
  styleUrls: ['./new-foreign-user-detail.component.scss'],
})
export class NewForeignUserDetailComponent implements OnInit {
  nationalitys$!: Observable<any>;
  prefixList$!: Observable<any>;
  countries$!: Observable<any>;
  visaClassList$!: Observable<any>;
  visaTypeList$!: Observable<any>;
  mode: FormMode = 'view';
  approveChoices = approveChoices;
  checkedResult: any;
  kspRequest = new KspRequest();
  setPassword = '';
  birthdate = '';
  passportstartdate = '';
  passportenddate = '';

  form = this.fb.group({
    kuruspano: [null],
    prefixen: [null],
    firstnameen: [null],
    middlenameen: [null],
    lastnameen: [null],
    birthdate: [null],
    country: [null],
    nationality: [null],
    contactphone: [null],
    email: [null],
    idcardno: [null],
    passportno: [null],
    passportstartdate: [null],
    passportenddate: [null],
    visaclass: [null],
    visatype: [null],
    visaexpiredate: [null],
  });

  verifyForm = this.fb.group({
    result: [null, Validators.required],
  });

  constructor(
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private eRequestService: ERequestService,
    public dialog: MatDialog,
    private myInfoService: MyInfoService
  ) {}

  ngOnInit(): void {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.countries$ = this.addressService.getCountry();
    this.nationalitys$ = this.generalInfoService.getNationality();
    this.visaClassList$ = this.generalInfoService.getVisaClass();
    this.visaTypeList$ = this.generalInfoService.getVisaType();
    this.form.disable();
    this.checkRequestId();
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      const requestId = Number(params.get('id'));
      //console.log('request id = ', requestId);
      if (requestId) {
        this.loadRequestFromId(requestId);
      }
    });
  }

  loadRequestFromId(id: number) {
    this.eRequestService.getKspRequestById(id).subscribe((res) => {
      //console.log('this.userData = ', res);
      this.kspRequest = res;
      this.form.patchValue(formatDatePayload(res));
    });
  }

  unApproveUser() {
    const payload: KspApprovePayload = {
      requestid: `${this.kspRequest.id}`,
      process: '1',
      status: '3',
      detail: null,
      systemtype: '4', //e-service
      userid: getCookie('userId'),
      paymentstatus: null,
    };

    this.eRequestService.KspUpdateRequestProcess(payload).subscribe(() => {
      //console.log('un approve result = ', res);
      this.completeDialog();
    });
  }

  approveUser() {
    const payload: KspApprovePayload = {
      requestid: `${this.kspRequest.id}`,
      process: '1',
      status: '2',
      detail: null,
      systemtype: '4', //e-service
      userid: getCookie('userId'),
      paymentstatus: null,
    };

    this.eRequestService.KspUpdateRequestProcess(payload).subscribe(() => {
      const myInfo: SelfMyInfo = {
        //lastlogouttime: '2022-09-06T00:20:13',
        isactive: '1',
        username: this.kspRequest.kuruspano,
        password: this.kspRequest.uniqueno,
        firstnameth: null,
        lastnameth: null,
        firstnameen: this.kspRequest.firstnameen,
        lastnameen: this.kspRequest.lastnameen,
        //idcardno: this.kspRequest.idcardno,
        idcardno: this.kspRequest.kuruspano,
        kuruspano: this.kspRequest.kuruspano,
        phone: this.kspRequest.contactphone,
        email: this.kspRequest.email,
        birthdate: this.kspRequest.birthdate,
        province: null,
        nationality: this.kspRequest.nationality,
        religion: null,
        addressinfo: null, //"{'field1':'data1','field2':'data2','field3':'data3'}",
        schooladdrinfo: null, //"{'field1':'data1','field2':'data2','field3':'data3'}",
        eduinfo: null, //"{'field1':'data1','field2':'data2','field3':'data3'}",
        experienceinfo: null, //"{'field1':'data1','field2':'data2','field3':'data3'}",
        competencyinfo: null, //"{'field1':'data1','field2':'data2','field3':'data3'}",
        selfdevelopmentinfo: null, //"{'field1':'data1','field2':'data2','field3':'data3'}",
        paymenthistory: null, //"{'field1':'data1','field2':'data2','field3':'data3'}",
        usertype: '2', // ครูต่างชาติ
        prefixth: null,
        prefixen: this.kspRequest.prefixen,
        middlenameen: this.kspRequest.middlenameen,
        idcardbackno: null,
        idcardimage: null,
        passportno: this.kspRequest.passportno,
        passportstartdate: this.kspRequest.passportstartdate,
        passportenddate: this.kspRequest.passportenddate,
        visaclass: this.kspRequest.visaclass,
        visatype: this.kspRequest.visatype,
        visaenddate: this.kspRequest.visaexpiredate,
        teachercouncilidno: null, //this.kspRequest.kuruspano,
        country: this.kspRequest.country,
        identificationno: null, //'111',
        approveinfo: null, //"{'field1':'data1','field2':'data2','field3':'data3'}",
        requestinfo: null, //"{'field1':'data1','field2':'data2','field3':'data3'}",
        licenseinfo: null, //"{'field1':'data1','field2':'data2','field3':'data3'}",
        uniquetimestamp: uuidv4(),
        personimage: null,
        sex: this.kspRequest.sex,
      };

      const payload = formatDatePayload(myInfo);

      this.myInfoService
        .insertMyInfo(replaceEmptyWithNull(payload))
        .subscribe((res) => {
          //console.log('insert myinfo = ', res);
          this.completeDialog();
        });
    });
  }

  confirm() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการบันทึกข้อมูล
        ใช่หรือไม่? `,
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe(() => {
      const form: any = this.verifyForm.controls.result.value;
      const result = form.result;
      if (result === '1') {
        this.approveUser();
      } else {
        this.unApproveUser();
      }
    });
  }

  completeDialog() {
    const dialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: `บันทึกข้อมูลสำเร็จ`,
      },
    });

    dialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.cancel();
      }
    });
  }

  cancel() {
    this.router.navigate(['self-user', 'new-user-list']);
  }
}

const approveChoices = [
  {
    name: 'อนุมัติ',
    value: 1,
  },
  {
    name: 'ไม่อนุมัติ',
    value: 0,
  },
];
