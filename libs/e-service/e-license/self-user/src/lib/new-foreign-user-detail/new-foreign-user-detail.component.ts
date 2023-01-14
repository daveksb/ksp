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
import { getCookie, jsonParse } from '@ksp/shared/utility';
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
  requestId!: number | null;
  savingData: any;

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
    visaenddate: [null],
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
      console.log('request id = ', requestId);
      if (requestId) {
        this.loadRequestFromId(requestId);
      }
    });
  }

  loadRequestFromId(id: number) {
    this.eRequestService.getKspRequestById(id).subscribe((res) => {
      console.log('request data = ', res);
      this.kspRequest = res;

      if (res.birthdate) {
        res.birthdate = res.birthdate.split('T')[0];
      }

      if (res.passportstartdate) {
        res.passportstartdate = res.passportstartdate.split('T')[0];
      }

      if (res.passportenddate) {
        res.passportenddate = res.passportenddate.split('T')[0];
      }

      this.form.patchValue(<any>res);

      /*
      const data: any = res;
      this.form.controls.userInfo.patchValue(data);

      const coordinator = parseJson(res.coordinatorinfo);
      //console.log('coordinator = ', res);
      this.form.controls.coordinatorInfo.patchValue(coordinator.coordinator); */
    });
  }

  unApproveUser() {
    const payload: KspApprovePayload = {
      requestid: `${this.requestId}`,
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
      requestid: `${this.requestId}`,
      process: '1',
      status: '2',
      detail: null,
      systemtype: '4', //e-service
      userid: getCookie('userId'),
      paymentstatus: null,
    };

    this.eRequestService.KspUpdateRequestProcess(payload).subscribe(() => {
      const user: any = {
        ...this.kspRequest,
      };
      user.usertype = '2'; // ครูต่างชาติ
      user.isactive = '1';
      user.uniquetimestamp = uuidv4();

      this.myInfoService.insertMyInfo(user).subscribe(() => {
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
    console.log('retired result = ', this.kspRequest);
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
