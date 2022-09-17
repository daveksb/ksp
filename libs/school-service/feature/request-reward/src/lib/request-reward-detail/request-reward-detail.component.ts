import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SchoolRequestProcess } from '@ksp/shared/constant';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { defaultRequestPayload } from '@ksp/shared/interface';
import {
  GeneralInfoService,
  RequestLicenseService,
  SchoolInfoService,
} from '@ksp/shared/service';
import { parseJson } from '@ksp/shared/utility';
import { Observable } from 'rxjs';

@Component({
  selector: 'ksp-request-reward-detail',
  templateUrl: './request-reward-detail.component.html',
  styleUrls: ['./request-reward-detail.component.scss'],
})
export class RequestRewardDetailComponent implements OnInit {
  form = this.fb.group({
    reward: [],
  });

  rewards = rewards;
  schoolId = '0010201056';
  osoiTypes$!: Observable<any>;
  personTypes$!: Observable<any>;
  prefixList$!: Observable<any>;
  requestId = 0;
  requestNo = '';
  memberData!: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private requestService: RequestLicenseService,
    private schoolInfoService: SchoolInfoService,
    private generalInfoService: GeneralInfoService
  ) {}

  ngOnInit(): void {
    this.getListData();
    this.checkRequestId();
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
    this.requestService.getRequestById(id).subscribe((res: any) => {
      this.requestNo = res.requestno;

      const osoiInfo = parseJson(res.osoiinfo);
      const osoiMember = parseJson(res.osoimember);
      //console.log('osoi info = ', osoiInfo);
      //console.log('osoi member = ', osoiMember);
      this.form.controls.reward.patchValue(osoiInfo);
      this.memberData = osoiMember;

      //console.log('current process = ', this.currentProcess);
    });
  }

  createRequest(form: any) {
    //console.log('create request = ');
    const baseForm = this.fb.group(defaultRequestPayload);
    form.schoolid = this.schoolId;
    form.ref1 = `2`;
    form.ref2 = '40';
    form.ref3 = '1';
    form.systemtype = `2`;
    form.requesttype = `40`;
    form.subtype = `5`;
    form.currentprocess = `${SchoolRequestProcess.กำลังสร้าง}`;
    form.osoimember = JSON.stringify(form.osoimember);

    const osoiInfo = {
      rewardname: form.rewardname,
      rewardtype: form.rewardtype,
      submitbefore: form.submitbefore,
      vdolink: form.vdolink,
    };
    form.osoiinfo = JSON.stringify(osoiInfo);

    baseForm.patchValue(form);
    console.log('current form = ', baseForm.value);
    this.requestService.requestLicense(baseForm.value).subscribe((res) => {
      //console.log('request result = ', res);
    });
  }

  getListData() {
    this.osoiTypes$ = this.schoolInfoService.getOsoiTypes();
    this.personTypes$ = this.schoolInfoService.getPersonTypes();
    this.prefixList$ = this.generalInfoService.getPrefix();
  }

  cancel() {
    this.router.navigate(['/temp-license', 'list']);
  }

  save(form: any) {
    /*     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่?`,
      },
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onConfirmed();
      }
    }); */
  }

  onConfirmed() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: `ระบบทำการบันทึก
        และส่งเรื่องให้เเจ้าหน้าที่เรียบร้อยแล้ว`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.cancel();
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
