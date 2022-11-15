import { Component, OnInit } from '@angular/core';
import {
  UserInfoFormType,
  SelfServiceRequestSubType,
  SelfServiceRequestType,
  SelfServiceRequestForType,
} from '@ksp/shared/constant';
import { LicenseFormBaseComponent } from '@ksp/self-service/form';
import { FormBuilder } from '@angular/forms';
import {
  AddressService,
  GeneralInfoService,
  EducationDetailService,
  MyInfoService,
  SelfRequestService,
} from '@ksp/shared/service';
import {
  getCookie,
  parseJson,
  replaceEmptyWithNull,
  toLowercaseProp,
} from '@ksp/shared/utility';
import { FileGroup, SelfRequest } from '@ksp/shared/interface';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

const EDU_FILES: FileGroup[] = [
  {
    name: '1. สำเนาใบรายงานผลการศึกษา (transcript)',
    files: [],
  },
];

const OBJECTIVE_FILES: FileGroup[] = [
  {
    name: '1. สำเนาคำอธิบายรายวิชาที่ขอเทียบโอนความรู้ฯตามหลักสูตรที่สำเร็จการศึกษาที่มีตราประทับของทางสถาบันที่สำเร็จการศึกษาและมีเจ้าหน้าที่ของสถาบันลงนามรับรองสำเนาถูกต้อง',
    files: [],
  },
];

/* const EDU_FILES = [
  {
    name: 'สำเนาใบรายงานผลการศึกษา (transcript)',
    fileid: '',
    filename: '',
  },
];

const OBJECTIVE_FILES = [
  {
    name: 'สำเนาคำอธิบายรายวิชาที่ขอเทียบโอนความรู้ฯตามหลักสูตรที่สำเร็จการศึกษาที่มีตราประทับของทางสถาบันที่สำเร็จการศึกษาและมีเจ้าหน้าที่ของสถาบันลงนามรับรองสำเนาถูกต้อง',
    fileid: '',
    filename: '',
  },
];
 */

@Component({
  selector: 'ksp-transfer-knowledge-request',
  templateUrl: './transfer-knowledge-request.component.html',
  styleUrls: ['./transfer-knowledge-request.component.scss'],
})
export class TransferKnowledgeRequestComponent
  extends LicenseFormBaseComponent
  implements OnInit
{
  userInfoType = UserInfoFormType.thai;
  headerGroup = ['วันที่ทำรายการ', 'เลขใบคำขอ'];
  eduFiles: any[] = [];
  transferFiles: any[] = [];

  override form = this.fb.group({
    userInfo: [],
    address1: [],
    address2: [],
    workplace: [],
    educationInfo: [],
    transferKnowledgeInfo: [],
  });

  countries$!: Observable<any>;

  constructor(
    dialog: MatDialog,
    router: Router,
    fb: FormBuilder,
    generalInfoService: GeneralInfoService,
    addressService: AddressService,
    educationDetailService: EducationDetailService,
    myInfoService: MyInfoService,
    requestService: SelfRequestService,
    route: ActivatedRoute
  ) {
    super(
      generalInfoService,
      addressService,
      educationDetailService,
      fb,
      requestService,
      router,
      myInfoService,
      route,
      dialog
    );
  }

  ngOnInit(): void {
    this.getListData();
    // this.getMyInfo();
    // this.checkButtonsDisableStatus();
    // this.initializeFiles();
    this.checkRequestId();
  }

  override initializeFiles(): void {
    super.initializeFiles();
    this.eduFiles = structuredClone(EDU_FILES);
    this.transferFiles = structuredClone(OBJECTIVE_FILES);
    this.uniqueTimestamp = uuidv4();
  }

  override patchData(data: SelfRequest) {
    super.patchData(data);
    if (data.eduinfo) {
      const eduInfo = parseJson(data.eduinfo);
      this.form.controls.educationInfo.patchValue({
        ...eduInfo,
      } as any);
    }

    if (data.transferknowledgeinfo) {
      const transferKnowledgeInfo = parseJson(data.transferknowledgeinfo);
      console.log(transferKnowledgeInfo);
      this.form.controls.transferKnowledgeInfo.patchValue({
        ...transferKnowledgeInfo,
      });
    }

    if (data.fileinfo) {
      const fileInfo = parseJson(data.fileinfo);
      const { edufiles, transferknowledgeinfofiles } = fileInfo;
      this.eduFiles = edufiles;
      this.transferFiles = transferknowledgeinfofiles;
    }
  }

  override getListData(): void {
    super.getListData();
    this.countries$ = this.addressService.getCountry();
  }

  patchUserInfoForm(data: any): void {
    this.form.controls.userInfo.patchValue(data);
  }

  patchAddress1Form(data: any): void {
    this.form.controls.address1.patchValue(data);
  }

  patchAddress2Form(data: any): void {
    this.form.controls.address2.patchValue(data);
  }

  patchWorkPlaceForm(data: any): void {
    this.form.controls.workplace.patchValue(data);
  }

  patchAddress2FormWithAddress1(): void {
    this.form.controls.address2.patchValue(this.form.controls.address1.value);
  }

  createRequest(currentProcess: number) {
    const formData: any = this.form.getRawValue();
    if (formData?.address1?.addressType) formData.address1.addresstype = 1;
    if (formData?.address2?.addressType) formData.address2.addresstype = 2;

    const { id, ...rawUserInfo } = formData.userInfo;
    const userInfo = toLowercaseProp(rawUserInfo);

    const self = new SelfRequest(
      '1',
      SelfServiceRequestType.ขอหนังสือรับรองความรู้,
      `${SelfServiceRequestSubType.อื่นๆ}`,
      currentProcess
    );
    self.isforeign = `${SelfServiceRequestForType.ชาวไทย}`;
    self.uniqueno = this.uniqueTimestamp;
    self.userid = getCookie('userId');
    const allowKey = Object.keys(self);

    const edufiles = this.eduFiles;
    const transferknowledgeinfofiles = this.transferFiles;

    const initialPayload = {
      ...replaceEmptyWithNull(userInfo),
      ...(this.requestId && { id: `${this.requestId}` }),
      ...(this.imageId && { imagefileid: `${this.imageId}` }),
      ...{
        addressinfo: JSON.stringify([formData.address1, formData.address2]),
      },
      ...{
        schooladdrinfo: JSON.stringify(formData.workplace),
      },
      ...{
        eduinfo: JSON.stringify(formData.educationInfo),
      },
      ...{
        transferknowledgeinfo: JSON.stringify(formData.transferKnowledgeInfo),
      },
      ...{ fileinfo: JSON.stringify({ edufiles, transferknowledgeinfofiles }) },
    };
    console.log(initialPayload);
    const payload = _.pick({ ...self, ...initialPayload }, allowKey);
    console.log(payload);
    return payload;
  }

  onSave(currentProcess: number) {
    console.log(this.form.value);
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        btnLabel: 'บันทึก',
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        const payload = this.createRequest(currentProcess);
        const request = this.requestId
          ? this.requestService.updateRequest.bind(this.requestService)
          : this.requestService.createRequest.bind(this.requestService);
        request(payload).subscribe((res) => {
          console.log('request result = ', res);
          if (res?.returncode === '00') {
            if (currentProcess === 1) {
              this.router.navigate(['/home']);
            } else {
              this.router.navigate(['/license', 'payment-channel']);
            }
          }
        });
      }
    });
  }

  back() {
    this.router.navigate(['/home']);
  }
}
