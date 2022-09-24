import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ListData, SelfMyInfo, SelfRequest } from '@ksp/shared/interface';
import {
  MyInfoService,
  SelfRequestService,
  GeneralInfoService,
  EducationDetailService,
} from '@ksp/shared/service';
import { providerFactory, replaceEmptyWithNull } from '@ksp/shared/utility';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { parseJson } from '@ksp/shared/utility';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';
import { Router } from '@angular/router';

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

  constructor(
    //private route: ActivatedRoute,
    /*     router: Router,
    dialog: MatDialog,
    addressService: AddressService,
    generalInfoService: GeneralInfoService,
    educationDetailService: EducationDetailService,
     */
    private requestService: SelfRequestService,
    private fb: FormBuilder,
    private myInfoService: MyInfoService,
    private generalInfoService: GeneralInfoService,
    private educationDetailService: EducationDetailService,
    private dialog: MatDialog,
    private router: Router
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
        this.addressInfo = addresses[0];
      }

      if (res.schooladdrinfo) {
        this.workplaceInfo = parseJson(res.schooladdrinfo);
      }
    });
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.bureau$ = this.educationDetailService.getBureau();
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
        const payload = this.createRequest(0);
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

  createRequest(currentProcess: number) {
    const self = new SelfRequest(
      '1',
      `${this.form.value.rewardType}`,
      '1',
      currentProcess
    );
    const allowKey = Object.keys(self);
    const form: any = this.form.value.rewardDetail;
    console.log(form);
    const { phone, fax, email, website } = form;
    const selectData = _.pick(form.userInfo, allowKey);
    const filledData = {
      ...self,
      ...selectData,
      ...{
        addressinfo: JSON.stringify(form.addressInfo),
      },
      ...{
        schooladdrinfo: JSON.stringify({
          ...form.workplace,
          phone,
          fax,
          email,
          website,
        }),
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
