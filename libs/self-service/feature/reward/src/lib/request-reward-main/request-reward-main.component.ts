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
import { Router } from '@angular/router';
import {
  SelfServiceRequestForType,
  SelfServiceRequestSubType,
} from '@ksp/shared/constant';
import { v4 as uuidv4 } from 'uuid';
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
    private service: RequestRewardMainService
  ) {}

  ngOnInit(): void {
    this.myInfoService.getMyInfo().subscribe((res) => {
      this.myInfo = {
        ...res,
        birthdate: res.birthdate?.split('T')[0] || null,
        contactphone: res.phone,
      };

      const addresses = parseJson(res.addressinfo);
      if (addresses?.length) {
        if (this.form.value.rewardType === 40) {
          this.addressInfo = addresses;
        } else {
          this.addressInfo = addresses[0];
        }
      }

      if (res.schooladdrinfo) {
        this.workplaceInfo = parseJson(res.schooladdrinfo);
      }
    });
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.bureau$ = this.educationDetailService.getBureau();
    this.initializeFiles();
  }

  initializeFiles() {
    this.uniqueTimestamp = uuidv4();
    console.log(this.form.value.rewardType);
    this.form.controls.rewardType.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        const formType = +(res || 0);
        switch (formType) {
          case 40:
            this.rewardFiles = structuredClone(this.service.councilRewardFiles);
            break;
          case 41:
            this.rewardFiles = structuredClone(
              this.service.thaiTeacherRewardFiles
            );
            break;
          case 42:
            this.rewardFiles = structuredClone(
              this.service.bestTeacherRewardFiles
            );
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
            this.rewardFiles = structuredClone(
              this.service.researchRewardFiles
            );
            break;
        }
      });
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
        this.requestService.createRequest(payload).subscribe((res) => {
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
        this.requestService.createRequest(payload).subscribe((res) => {
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
    const rewardfiles = this.mapFileInfo(this.rewardFiles);

    const filledData = {
      ...self,
      ...selectData,
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

  mapFileInfo(fileList: any[]) {
    return fileList.map((file: any) => {
      const object = {
        fileid: file.fileId || null,
        filename: file.fileName || null,
        name: file.name || null,
      };
      return object;
    });
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
