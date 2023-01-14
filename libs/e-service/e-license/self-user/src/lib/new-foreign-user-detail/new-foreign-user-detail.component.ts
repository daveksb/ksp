import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { FormMode, KspApprovePayload, KspRequest } from '@ksp/shared/interface';
import {
  AddressService,
  ERequestService,
  GeneralInfoService,
} from '@ksp/shared/service';
import { getCookie, jsonParse } from '@ksp/shared/utility';
import { Observable } from 'rxjs';

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
    public dialog: MatDialog
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
      this.form.patchValue(<any>res);
      /*
      const data: any = res;
      this.form.controls.userInfo.patchValue(data);

      const coordinator = parseJson(res.coordinatorinfo);
      //console.log('coordinator = ', res);
      this.form.controls.coordinatorInfo.patchValue(coordinator.coordinator); */
    });
  }

  retireUser() {
    const payload: KspApprovePayload = {
      requestid: `${this.requestId}`,
      process: '1',
      status: '2',
      detail: null,
      systemtype: '4', //e-service
      userid: getCookie('userId'),
      paymentstatus: null,
    };

    this.eRequestService.KspUpdateRequestProcess(payload).subscribe((res) => {
      //console.log('update result = ', res);
      this.completeDialog();
    });

    const retirePayload = {
      schmemberid: this.kspRequest.userid,
      schuseractive: '0',
    };

    this.eRequestService.retiredUser(retirePayload).subscribe((res) => {
      console.log('retired result = ', res);
    });
  }

  approveUser() {
    const deActivateAllUser = this.eRequestService.deActivateAllUser(
      this.kspRequest.schoolid ?? ''
    );

    const updatePayload: KspApprovePayload = {
      requestid: `${this.requestId}`,
      process: '1',
      status: '2',
      detail: null,
      systemtype: '4', //e-service
      userid: getCookie('userId'),
      paymentstatus: null,
    };
    const updateRequest =
      this.eRequestService.KspUpdateRequestProcess(updatePayload);

    /* const user = new SchUser();
    const coordinatorinfo = jsonParse(this.kspRequest.coordinatorinfo || '{}');

    user.idcardno = this.kspRequest.idcardno;
    user.prefixth = this.kspRequest.prefixth;
    user.schemail = this.kspRequest.email;
    user.position = this.kspRequest.position;
    user.firstnameth = this.kspRequest.firstnameth;
    user.lastnameth = this.kspRequest.lastnameth;
    user.schusername = this.kspRequest.schoolid;
    user.schoolid = this.kspRequest.schoolid;
    user.schmobile = this.kspRequest.contactphone;
    user.schpassword = this.setPassword;
    user.requestid = this.kspRequest.id;
    user.schuseractive = '1';
    user.schuserstartdate = moment().format('yyyy-MM-DD');
    user.coordinatorinfo = JSON.stringify(coordinatorinfo); */
    //console.log('user = ', user);

    /* payload.usertype = '2'; // ครูต่างชาติ
    payload.isactive = '1';
    payload.uniquetimestamp = uuidv4();
    return this.myInfoService.insertMyInfo(payload); */
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
      const resultOk = +form.result;
      if (resultOk) {
        if (this.kspRequest.requesttype === '1') {
          this.approveUser();
        } else if (this.kspRequest.requesttype === '2') {
          this.retireUser();
        }
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
