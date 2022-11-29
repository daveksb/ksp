import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ACADEMIC_FILES,
  REQUEST_DOCUMENT_FILES,
} from '@ksp/self-service/feature/license';
import { ESelfFormBaseComponent } from '@ksp/shared/form/others';
import {
  FileGroup,
  KspApprovePersistData,
  SelfGetRequest,
  SelfRequest,
} from '@ksp/shared/interface';
import {
  ERequestService,
  MyInfoService,
  SelfRequestService,
} from '@ksp/shared/service';
import { parseJson } from '@ksp/shared/utility';
import localForage from 'localforage';

const VERIFY_CHOICES = [
  {
    name: 'ครบถ้วน และถูกต้อง',
    value: 'complete',
  },
  {
    name: 'ไม่ครบถ้วน และไม่ถูกต้อง',
    value: 'incomplete',
  },
];

const FORM_TAB_COUNT = 4;

@Component({
  selector: 'ksp-request-license-foreign-detail',
  templateUrl: './request-license-foreign-detail.component.html',
  styleUrls: ['./request-license-foreign-detail.component.scss'],
})
export class RequestLicenseForeignDetailComponent implements OnInit {
  form = this.fb.group({
    personalDetail: [],
    personalDeclaration: [],
    foreignCheckDocument: [],
    foreignSelectUpload: [],

    checkResult: this.fb.array([]),
  });

  get checkResultFormArray() {
    return this.form.controls.checkResult as FormArray;
  }

  uniqueTimestamp!: string;
  requestId!: number;
  requestData!: SelfRequest;
  requestNo: string | null = '';
  currentProcess!: number;
  userInfo: any;
  addressInfo: any;
  workplaceInfo: any;
  eduInfo: any;
  academicFiles: FileGroup[] = [];
  grantionTeachingInfo: any;
  personalDeclaration: any;
  documentFiles: FileGroup[] = [];
  myImage = '';
  verifyChoice: any[] = VERIFY_CHOICES;
  selectedTab: StepperSelectionEvent = new StepperSelectionEvent();

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private requestService: ERequestService,
    private route: ActivatedRoute,
    private myInfoService: MyInfoService
  ) {}

  ngOnInit(): void {
    this.checkRequestId();
    this.academicFiles = structuredClone(ACADEMIC_FILES);
    this.documentFiles = structuredClone(REQUEST_DOCUMENT_FILES);
    this.addCheckResultArray();
  }

  addCheckResultArray() {
    for (let i = 0; i < FORM_TAB_COUNT; i++) {
      this.checkResultFormArray.push(this.fb.control(null));
    }
    this.checkResultFormArray.setValidators(
      ESelfFormBaseComponent.allFilledValidator()
    );
  }

  onStepChange(e: StepperSelectionEvent) {
    this.selectedTab = e;
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        this.requestService
          .getKspRequestById(this.requestId)
          .subscribe((res) => {
            console.log(res);
            this.requestData = res;
            if (res) {
              this.patchData(res);
            }
          });
      }
    });
  }

  patchData(data: SelfGetRequest) {
    const address = parseJson(data.addressinfo);
    this.patchUserInfo(data);
    this.patchAddress(address, address?.[0].phone, address?.[0].email);

    if (data.schooladdrinfo) {
      const workplace = parseJson(data.schooladdrinfo);
      const { addressName, ...addressForm } = workplace;
      this.workplaceInfo = { addressName, addressForm };
    }

    if (data.eduinfo) {
      const eduInfo = parseJson(data.eduinfo);
      this.eduInfo = eduInfo;
    }

    if (data.fileinfo) {
      const fileInfo = parseJson(data.fileinfo);
      const { documentfiles, academicfiles } = fileInfo;
      this.documentFiles = documentfiles;
      this.academicFiles = academicfiles;
    }

    if (data.grantionteachinglicenseinfo) {
      const grantionTeachingInfo = parseJson(data.grantionteachinglicenseinfo);
      this.grantionTeachingInfo = grantionTeachingInfo;
    }

    if (data.checkprohibitproperty) {
      const personalDeclaration = parseJson(data.checkprohibitproperty);
      this.personalDeclaration = personalDeclaration;
    }

    if (data.foreigncheckdocument) {
      const foreignCheckDocument = parseJson(data.foreigncheckdocument);
      this.form.controls.foreignCheckDocument.patchValue(foreignCheckDocument);
    }

    if (data.foreignselectupload) {
      const foreignSelectUpload = parseJson(data.foreignselectupload);
      this.form.controls.foreignSelectUpload.patchValue(foreignSelectUpload);
    }

    if (data.filedata) {
      this.myImage = atob(data.filedata);
    }
  }

  patchUserInfo(data: any) {
    const {
      birthdate,
      firstnameen,
      lastnameen,
      prefixen,
      id,
      middlenameen,
      passportno,
      nationality,
      foreignpassporttype,
    } = data || { foreignpassporttype: '' };
    const patchData = {
      birthdate: birthdate.split('T')[0],
      firstnameen,
      lastnameen,
      prefixen,
      id,
      middlenameen,
      passportno,
      nationality,
      foreignpassporttype,
    } as any;
    this.userInfo = patchData;
  }

  patchAddress(addrs: any[], phone: any, email: any) {
    if (addrs && addrs.length) {
      const addr = addrs[0];
      this.addressInfo = {
        ...addr,
        phone,
        email,
      };
    }
  }

  persistData(checkDetail: any) {
    console.log(this.requestData);
    const saveData: KspApprovePersistData = {
      checkDetail,
      requestData: this.requestData,
    };
    localForage.setItem('checkRequestData', saveData);
  }

  next() {
    this.persistData(this.form.controls.checkResult.value);
    this.router.navigate([
      '/request-foreign-license',
      'confirm',
      this.requestId,
    ]);
  }

  cancel() {
    this.router.navigate(['/request-foreign-license', 'list']);
  }
}
