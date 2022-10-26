import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import {
  FileGroup,
  KspRequest,
  KspRequestProcess,
  PersonType,
  Prefix,
  SchoolRequest,
} from '@ksp/shared/interface';
import {
  GeneralInfoService,
  SchoolInfoService,
  SchoolRequestService,
} from '@ksp/shared/service';
import { getCookie, mapFileInfo, parseJson } from '@ksp/shared/utility';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'ksp-request-reward-detail',
  templateUrl: './request-reward.component.html',
  styleUrls: ['./request-reward.component.scss'],
})
export class RequestRewardComponent implements OnInit {
  form = this.fb.group({
    reward: [],
  });

  uniqueNo = '';
  requestData = new KspRequest();
  rewards = rewards;
  schoolId = getCookie('schoolId');
  osoiTypes$!: Observable<any>;
  personTypes$!: Observable<PersonType[]>;
  prefixList$!: Observable<Prefix[]>;
  requestId = 0;
  memberData!: any;
  disableTempSave = true;
  disablePermanentSave = true;
  disableCancel = false;
  uniqueTimeStamp!: string;
  showCancelButton = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private requestService: SchoolRequestService,
    private schoolInfoService: SchoolInfoService,
    private generalInfoService: GeneralInfoService
  ) {}

  ngOnInit(): void {
    this.uniqueNo = uuidv4();
    this.getListData();
    this.checkRequestId();
    this.checkButtonDisableStatus();

    this.form.valueChanges.subscribe(() => {
      this.checkButtonDisableStatus();
    });
  }

  checkButtonDisableStatus() {
    //console.log('this.currentprocess = ', this.currentProcess);
    if (!this.form.valid) {
      this.disableTempSave = true;
      this.disablePermanentSave = true;
      return;
    } else if (this.requestData.process === '2') {
      this.disableTempSave = true;
      this.disablePermanentSave = true;
    } else if (this.requestData.process === '1') {
      this.disableTempSave = false;
      this.disablePermanentSave = false;
    } else if (this.requestData.process === '0') {
      this.disableTempSave = true;
      this.disablePermanentSave = true;
      this.disableCancel = true;
    }
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        this.loadRequestFromId(this.requestId);
      } else {
        this.uniqueTimeStamp = uuidv4();
      }
    });
  }

  onTempSave() {
    // if no requestid , create request with currentProcess = 1, requestStatus = 1
    if (!this.requestId) {
      this.createRequest('1', '1', this.form.controls.reward.value);
    } else {
      //if has requestid , update request with currentProcess = 1, requestStatus = 1
      this.updateRequest('1', '1', this.form.controls.reward.value);
    }
  }

  onPermanentSave() {
    // if no requestid , create request with currentProcess = 2, requestStatus = 1
    if (!this.requestId) {
      this.createRequest('2', '1', this.form.controls.reward.value);
    } else {
      // if has requestid , update request with currentProcess = 2, requestStatus = 1
      this.updateRequest('2', '1', this.form.controls.reward.value);
    }
  }

  cancelRequest() {
    const payload: KspRequestProcess = {
      id: `${this.requestId}`,
      process: `${this.requestData.process}`,
      status: '0',
      detail: null,
      userid: null,
      paymentstatus: null,
    };
    this.requestService.schCancelRequest(payload).subscribe(() => {
      //
    });
  }

  loadRequestFromId(id: number) {
    this.requestService.schGetRequestById(id).subscribe((res) => {
      //console.log('res = ', res);
      this.requestData = res;
      this.uniqueTimeStamp = res.uniqueno || 'default-unique-timestamp';
      this.showCancelButton = res.status !== '0';

      const osoiInfo = parseJson(res.osoiinfo);
      const osoiMember = parseJson(res.osoimember);
      console.log('osoi member   = ', osoiMember);
      this.form.controls.reward.patchValue(osoiInfo);
      this.memberData = osoiMember;
      //console.log('current process = ', this.currentProcess);
      //const file = parseJson(res.fileinfo);
      //console.log('get file = ', file);
    });
  }

  updateRequest(process: string, status: string, form: any) {
    console.log('form osoimember = ', form.osoimember);
    const baseForm = this.fb.group(new KspRequest());

    form.id = `${this.requestId}`;
    form.schoolid = this.schoolId;
    form.systemtype = `2`;
    form.requesttype = `40`;
    form.careertype = `5`;
    form.process = process;
    form.status = status;
    form.osoimember = JSON.stringify(form.osoimember);

    const file = structuredClone(rewardFiles);
    //console.log('file = ', file);
    const files = mapFileInfo(file);
    form.fileinfo = JSON.stringify({ files });

    const osoiInfo = {
      rewardname: form.rewardname,
      rewardtype: form.rewardtype,
      submitbefore: form.submitbefore,
      vdolink: form.vdolink,
    };
    form.osoiinfo = JSON.stringify(osoiInfo);

    baseForm.patchValue(form);

    const { ref1, ref2, ref3, ...payload } = baseForm.value;
    //console.log('payload = ', payload);
    this.requestService.schUpdateRequest(<any>payload).subscribe(() => {
      //console.log('request result = ', res);
      this.completeDialog();
    });
  }

  createRequest(currentProcess: string, requestStatus: string, form: any) {
    //console.log('form  = ', form);
    const baseForm = this.fb.group(new KspRequest());
    form.schoolid = this.schoolId;
    form.ref1 = '2';
    form.ref2 = '40';
    form.ref3 = '5';
    form.systemtype = '2';
    form.requesttype = `40`;
    form.subtype = `5`;
    form.process = currentProcess;
    form.status = requestStatus;
    form.careertype = '5';
    form.uniquetimestamp = this.uniqueTimeStamp;
    form.osoimember = JSON.stringify(form.osoimember);

    const osoiInfo = {
      rewardname: form.rewardname,
      rewardtype: form.rewardtype,
      submitbefore: form.submitbefore,
      vdolink: form.vdolink,
    };
    form.osoiinfo = JSON.stringify(osoiInfo);

    baseForm.patchValue(form);

    const { id, ...payload } = baseForm.value;
    //console.log('current form = ', baseForm.value);
    this.requestService.schCreateRequest(payload).subscribe(() => {
      //console.log('request result = ', res);
      this.completeDialog();
    });
  }

  getListData() {
    this.osoiTypes$ = this.schoolInfoService.getOsoiTypes();
    this.personTypes$ = this.schoolInfoService.getPersonTypes();
    this.prefixList$ = this.generalInfoService.getPrefix();
  }

  previousPage() {
    this.router.navigate(['/temp-license', 'list']);
  }

  confirmDialog(type: number) {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่?`,
      },
    });

    dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        if (type === 1) {
          this.onTempSave();
        } else if (type === 2) {
          this.onPermanentSave();
        }
      }
    });
  }

  completeDialog() {
    const dialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: `ระบบทำการบันทึก
        เรียบร้อยแล้ว`,
      },
    });

    dialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.previousPage();
      }
    });
  }
}

export const rewards = [
  { label: 'ไม่เคยส่งเข้ารับการคัดสรรกับคุรุสภา', value: 1 },
  {
    label: 'เคยส่งเข้ารับการคัดสรรกับคุรุสภา แต่ไม่ได้รับรางวัลของคุรุสภา',
    value: 2,
  },
  {
    label: 'ได้รับรางวัลของคุรุสภา แต่มีการพัฒนาต่อยอดนวัตกรรม',
    value: 3,
  },
];

const rewardFiles: FileGroup[] = [
  { name: 'แบบ นร. 1', files: [] },
  { name: 'แบบ นร.2', files: [] },
  { name: 'เอกสารอื่นๆ', files: [] },
  { name: 'บันทึกนำส่งจากสถานศึกษา', files: [] },
];
