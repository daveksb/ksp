import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ListData, SelfMyInfo, SelfRequest } from '@ksp/shared/interface';
import {
  MyInfoService,
  SelfRequestService,
  GeneralInfoService,
  EducationDetailService,
} from '@ksp/shared/service';
import {
  getCookie,
  providerFactory,
  replaceEmptyWithNull,
  toLowercaseProp,
} from '@ksp/shared/utility';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { parseJson } from '@ksp/shared/utility';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  SelfServiceRequestForType,
  SelfServiceRequestSubType,
} from '@ksp/shared/constant';
import { parse, v4 as uuidv4 } from 'uuid';
import { RequestRewardMainService } from './request-reward-main.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ksp-request-reward-main',
  templateUrl: './request-reward-main.component.html',
  styleUrls: ['./request-reward-main.component.scss'],
  providers: providerFactory(RequestRewardMainComponent),
})
export class RequestRewardMainComponent implements OnInit {
  headerGroup = [
    'วันที่ทำรายการ',
    'เลขใบคำขอ',
    'เลขที่ประจำตัวคุรุสภา',
    'เลขประจำตัวประชาชน',
    'เลขที่ใบอนุญาต',
    'วันที่ออกใบอนุญาต',
    'วันที่หมดอายุใบอนุญาต',
  ];

  rewardTypes: ListData[] = rewardTypes;
  myInfo!: SelfMyInfo;
  addressInfo: any;
  workplaceInfo: any;
  requestId!: number;
  requestData!: SelfRequest;
  requestNo: string | null = '';
  currentProcess!: number;

  form = this.fb.group({
    rewardType: [0],
    rewardDetail: [],
  });

  prefixList$!: Observable<any>;
  bureau$!: Observable<any>;
  uniqueTimestamp!: string;
  rewardFiles: any[] = [];

  constructor(
    private requestService: SelfRequestService,
    private fb: FormBuilder,
    private myInfoService: MyInfoService,
    private generalInfoService: GeneralInfoService,
    private educationDetailService: EducationDetailService,
    private dialog: MatDialog,
    private router: Router,
    private service: RequestRewardMainService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.bureau$ = this.educationDetailService.getBureau();
    this.checkRequestId();
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        // this.loadRequestFromId(this.requestId);
        this.requestService.getRequestById(this.requestId).subscribe((res) => {
          if (res) {
            console.log(res);
            this.requestData = res;
            this.requestNo = res.requestno;
            this.currentProcess = Number(res.currentprocess);
            this.uniqueTimestamp = res.uniquetimestamp || '';
            console.log(this.uniqueTimestamp);

            this.patchData(res);
          }
        });
      } else {
        this.getFormType();
      }
    });
  }

  getFormType() {
    this.form.controls.rewardType.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        const formType = +(res || 0);
        console.log(formType);
        this.initializeFiles(formType);
        this.getMyInfo(formType);
      });
  }

  patchData(data: SelfRequest) {
    console.log(data);
    const {
      requesttype,
      prefixth,
      prefixen,
      firstnameth,
      firstnameen,
      lastnameth,
      lastnameen,
      sex,
      birthdate,
      contactphone,
      workphone,
      email,
      addressinfo,
      schooladdrinfo,
      eduinfo,
      hiringinfo,
      rewardethicinfo,
      rewardsuccessinfo,
      rewarddetailinfo,
      fileinfo,
      ...resData
    } = data;
    const rewardType = +(requesttype || 0);
    const { rewardfiles } = parseJson(fileinfo);
    this.rewardFiles = rewardfiles;

    this.form.patchValue({
      rewardType,
    });

    this.myInfo = <any>{
      prefixth,
      prefixen,
      firstnameth,
      firstnameen,
      lastnameth,
      lastnameen,
      sex,
      birthdate: birthdate?.split('T')[0],
      contactphone,
      workphone,
      email,
    };
    this.addressInfo = parseJson(addressinfo);
    this.workplaceInfo = parseJson(schooladdrinfo);
    console.log(this.workplaceInfo);

    const eduInfo = parseJson(eduinfo);
    const hiringInfo = parseJson(hiringinfo);
    const rewardEthicInfo = parseJson(rewardethicinfo);
    const rewardSuccessInfo = parseJson(rewardsuccessinfo);
    const rewardDetailInfo = parseJson(rewarddetailinfo);
    this.form.controls.rewardDetail.patchValue(<any>{
      eduInfo,
      hiringInfo,
      rewardEthicInfo,
      rewardSuccessInfo,
      rewardDetailInfo,
    });

    // if (data.replacereasoninfo) {
    //   const replaceReasonInfo = parseJson(data.replacereasoninfo);
    //   this.form.controls.userInfo.patchValue(replaceReasonInfo);
    // }

    // if (addressinfo) {
    //   const addressInfo = parseJson(addressinfo)
    //   this.form.controls.
    // }

    // if (fileinfo) {
    //   const fileInfo = parseJson(fileinfo);
    //   console.log(fileInfo);
    //   const { rewardfiles } = fileInfo;
    //   this.rewardFiles = rewardfiles;
    // }
  }

  getMyInfo(formType: number) {
    this.myInfoService.getMyInfo().subscribe((res) => {
      this.myInfo = {
        ...res,
        birthdate: res.birthdate?.split('T')[0] || null,
        contactphone: res.phone,
      };

      const addresses = parseJson(res.addressinfo);
      console.log(addresses);
      if (addresses?.length) {
        if (formType === 40) {
          this.addressInfo = addresses;
        } else {
          this.addressInfo = addresses[0];
        }
      }

      if (res.schooladdrinfo) {
        this.workplaceInfo = parseJson(res.schooladdrinfo);
      }
    });
  }

  initializeFiles(formType: number) {
    this.uniqueTimestamp = uuidv4();

    switch (formType) {
      case 40:
        this.rewardFiles = structuredClone(this.service.councilRewardFiles);
        break;
      case 41:
        this.rewardFiles = structuredClone(this.service.thaiTeacherRewardFiles);
        break;
      case 42:
        this.rewardFiles = structuredClone(this.service.bestTeacherRewardFiles);
        break;
      case 43:
        this.rewardFiles = structuredClone(this.service.praiseRewardFiles);
        break;
      case 44:
        this.rewardFiles = structuredClone(
          this.service.seniorTeacherRewardFiles
        );
        break;
      case 45:
        this.rewardFiles = structuredClone(this.service.researchRewardFiles);
        break;
    }
  }

  tempSave() {
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
        const payload = this.createRequest(1);
        const request = this.requestId
          ? this.requestService.updateRequest.bind(this.requestService)
          : this.requestService.createRequest.bind(this.requestService);
        request(payload).subscribe((res) => {
          console.log('request result = ', res);
          if (res?.returncode === '00') {
            this.router.navigate(['/home']);
          }
        });
      }
    });
  }

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        btnLabel: 'บันทึก',
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        const payload = this.createRequest(2);
        const request = this.requestId
          ? this.requestService.updateRequest.bind(this.requestService)
          : this.requestService.createRequest.bind(this.requestService);
        request(payload).subscribe((res) => {
          console.log('request result = ', res);
          if (res?.returncode === '00') {
            this.router.navigate(['/home']);
          }
        });
      }
    });
  }

  createRequest(currentProcess: number) {
    const self = new SelfRequest(
      '1',
      `${this.form.value.rewardType}`,
      `${SelfServiceRequestSubType.อื่นๆ}`,
      currentProcess
    );
    const allowKey = Object.keys(self);
    const form: any = this.form.value.rewardDetail;
    //console.log(form);
    const userInfo = toLowercaseProp(form.userInfo);
    userInfo.requestfor = `${SelfServiceRequestForType.ชาวไทย}`;
    userInfo.uniquetimestamp = this.uniqueTimestamp;
    userInfo.staffid = getCookie('userId');
    const selectData = _.pick(userInfo, allowKey);
    const rewardfiles = this.rewardFiles;

    const filledData = {
      ...self,
      ...selectData,
      ...(this.requestId && { id: `${this.requestId}` }),
      ...(form.addressInfo && {
        addressinfo: JSON.stringify(form.addressInfo),
      }),
      ...{
        schooladdrinfo: JSON.stringify(form.workplace),
      },
      ...(form.rewardTeacherInfo && {
        rewardteacherinfo: JSON.stringify(form.rewardTeacherInfo),
      }),
      ...(form.eduInfo && {
        eduinfo: JSON.stringify(form.eduInfo),
      }),
      ...(form.hiringInfo && {
        hiringinfo: JSON.stringify(form.hiringInfo),
      }),
      ...(form.teachingInfo && {
        teachinginfo: JSON.stringify(form.teachingInfo),
      }),
      ...(form.rewardEthicInfo && {
        rewardethicinfo: JSON.stringify(form.rewardEthicInfo),
      }),
      ...(form.rewardSuccessInfo && {
        rewardsuccessinfo: JSON.stringify(form.rewardSuccessInfo),
      }),
      ...(form.rewardDetailInfo && {
        rewarddetailinfo: JSON.stringify(form.rewardDetailInfo),
      }),
      ...(form.rewardPunishmentInfo && {
        rewardpunishmentinfo: JSON.stringify(form.rewardPunishmentInfo),
      }),
      ...(form.rewardCareerInfo && {
        rewardcareerinfo: JSON.stringify(form.rewardCareerInfo),
      }),
      ...(form.rewardMoneySupportInfo && {
        rewardmoneysupportinfo: JSON.stringify(form.rewardMoneySupportInfo),
      }),
      ...(form.rewardResearcherInfo && {
        rewardresearcherinfo: JSON.stringify(form.rewardResearcherInfo),
      }),
      ...(form.rewardResearchInfo && {
        rewardresearchinfo: JSON.stringify(form.rewardResearchInfo),
      }),
      ...(form.rewardResearchHistory && {
        rewardresearchhistory: JSON.stringify(form.rewardResearchHistory),
      }),
      ...{ fileinfo: JSON.stringify({ rewardfiles }) },
    };
    const { id, requestdate, ...payload } = replaceEmptyWithNull(filledData);
    console.log('payload = ', payload);
    return payload;
  }
}

const rewardTypes = [
  {
    value: 40,
    label: `รางวัลคุรุสภา`,
  },
  {
    value: 41,
    label: `รางวัลครูภาษาไทยดีเด่น`,
  },
  {
    value: 42,
    label: `รางวัลครูผู้สอนดีเด่น`,
  },
  {
    value: 43,
    label: `รางวัลคุรุสดุดี`,
  },
  {
    value: 44,
    label: `รางวัลครูอาวุโส`,
  },
  {
    value: 45,
    label: `รางวัลผลงานวิจัยของคุรุสภา`,
  },
];
