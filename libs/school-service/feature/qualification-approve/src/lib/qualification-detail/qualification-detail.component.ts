import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import {
  QualificationApproveDetailComponent,
  QualificationApprovePersonComponent,
} from '@ksp/shared/form/others';
import {
  FileGroup,
  FormMode,
  KspRequest,
  KspRequestProcess,
} from '@ksp/shared/interface';
import {
  AddressService,
  GeneralInfoService,
  SchoolInfoService,
  SchoolRequestService,
  StaffService,
} from '@ksp/shared/service';
import {
  changeDate,
  formatDate,
  getCookie,
  mapMultiFileInfo,
  parseJson,
  replaceEmptyWithNull,
  thaiDate,
} from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@UntilDestroy()
@Component({
  selector: 'ksp-qualification-detail',
  templateUrl: './qualification-detail.component.html',
  styleUrls: ['./qualification-detail.component.scss'],
})
export class QualificationDetailComponent implements OnInit {
  form = this.fb.group({
    userInfo: [],
    addr1: [],
    addr2: [],
    edu1: [],
    edu2: [],
    edu3: [],
    edu4: [],
  });

  uniqueNo!: string;
  userInfoFormdisplayMode: number = UserInfoFormType.thai;
  prefixList$!: Observable<any>;
  provinces1$!: Observable<any>;
  provinces2$!: Observable<any>;
  amphurs1$!: Observable<any>;
  tumbols1$!: Observable<any>;
  amphurs2$!: Observable<any>;
  tumbols2$!: Observable<any>;
  countries$!: Observable<any>;
  nationalitys$!: Observable<any>;
  schoolId = getCookie('schoolId');
  careerType!: number;

  request: KspRequest = new KspRequest();
  requestId!: number;
  requestData = new KspRequest();
  requestStatus!: number;
  currentProcess!: number;
  otherreason: any;
  refperson: any;
  evidenceFiles: FileGroup[] = files;
  mode!: FormMode;
  showEdu2 = false;
  showEdu3 = false;
  showEdu4 = false;
  bureauName!: any;
  schoolName!: any;
  address!: any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService,
    private requestService: SchoolRequestService,
    private route: ActivatedRoute,
    private schoolInfoService: SchoolInfoService,
    private staffService: StaffService
  ) {}

  ngOnInit(): void {
    this.uniqueNo = uuidv4();
    this.getListData();
    this.checkRequestId();
    this.checkRequestSubType();
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        this.loadRequestData(this.requestId);
      }
    });
  }

  checkRequestSubType() {
    this.route.queryParams.pipe(untilDestroyed(this)).subscribe((params) => {
      if (Number(params['subtype'])) {
        this.careerType = Number(params['subtype']);
      }
    });
  }

  pathUserInfo(data: any) {
    data.birthdate = data?.birthdate?.split('T')[0];

    data.passportstartdate = data.passportstartdate.split('T')[0];
    data.passportenddate = data.passportenddate.split('T')[0];
    //console.log('data = ', data);
    if (data?.visainfo) {
      const visa = parseJson(data?.visainfo);
      data.visaclass = visa.visaclass;
      data.visatype = visa.visatype;
      data.visaenddate = visa.visaenddate;
    }

    this.form.controls.userInfo.patchValue(data);
  }

  searchStaffFromIdCard(idCard: string) {
    if (!idCard) return;
    const payload = {
      idcardno: idCard,
      schoolid: this.schoolId,
    };
    this.staffService
      .searchStaffFromIdCard(payload)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        //console.log('req = ', res);
        if (res && res.returncode !== '98') {
          //this.staffData = res;
          this.pathUserInfo(res);
          /*  this.patchAddress(parseJson(res.addresses));
          this.patchEdu(parseJson(res.educations));
          this.patchTeachingInfo(parseJson(res.teachinginfo));
          this.patchHiringInfo(parseJson(res.hiringinfo)); */
        } else {
          // search not found reset form and set idcard again
          //this.completeDialog('ไม่พบบุคคลากรที่ระบุ');
          this.form.reset();
          const temp: any = { idcardno: idCard };
          this.form.controls.userInfo.patchValue(temp);
        }
      });
  }

  loadRequestData(id: number) {
    this.requestService.schGetRequestById(id).subscribe((res) => {
      if (res) {
        this.requestStatus = Number(res.status);
        this.currentProcess = Number(res.process);
        res.birthdate = formatDate(res.birthdate);

        this.form.controls.userInfo.patchValue(<any>res);

        const edus = parseJson(res.eduinfo);
        this.patchEdu(edus);

        const addressinfo: any = parseJson(res.addressinfo);

        if (addressinfo) {
          for (let i = 0; i < addressinfo.length; i++) {
            const form = this.form.get(`addr${i + 1}`) as AbstractControl<
              any,
              any
            >;
            this.getAmphurChanged(i + 1, addressinfo[i].province);
            this.getTumbon(i + 1, addressinfo[i].amphur);
            form?.patchValue(addressinfo[i]);
          }
        }
        const json = parseJson(res.fileinfo);
        if (json && json.file && Array.isArray(json.file)) {
          this.evidenceFiles.forEach(
            (group, index) => (group.files = json.file[index])
          );
        }

        res.refperson
          ? (res.refperson = JSON.parse(atob(res.refperson)))
          : null;

        res.otherreason
          ? (res.otherreason = JSON.parse(atob(res.otherreason)))
          : null;

        this.refperson = res.refperson;
        this.otherreason = res.otherreason;
        this.mode = 'view';
      }
    });
  }

  patchEdu(edus: any[]) {
    //console.log('edus = ', edus);
    if (edus && edus.length) {
      edus.map((edu, i) => {
        if (edu.degreeLevel === 2) {
          this.showEdu2 = true;
        }
        if (edu.degreeLevel === 3) {
          this.showEdu3 = true;
        }
        if (edu.degreeLevel === 4) {
          this.showEdu4 = true;
        }
        (this.form.get(`edu${i + 1}`) as AbstractControl<any, any>).patchValue(
          edu
        );
      });
    }
  }

  eduSelected(type: number, evt: any) {
    const checked = evt.target.checked;
    if (type === 2) {
      this.showEdu2 = checked;
    }
    if (type === 3) {
      this.showEdu3 = checked;
    }
    if (type === 4) {
      this.showEdu4 = checked;
    }
  }

  getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.provinces1$ = this.addressService.getProvinces();
    this.provinces2$ = this.provinces1$;
    this.countries$ = this.addressService.getCountry();
    this.nationalitys$ = this.generalInfoService.getNationality();
    this.schoolInfoService
      .getSchoolInfo(this.schoolId)
      .pipe(untilDestroyed(this))
      .subscribe((res: any) => {
        this.schoolName = res.schoolName;
        this.bureauName = res.bureauName;
        this.address = `บ้านเลขที่ ${res.address} ซอย ${
          res?.street ?? ''
        } หมู่ ${res?.moo ?? ''} ถนน ${res?.road ?? ''} ตำบล ${
          res.tumbon
        } อำเภอ ${res.amphurName} จังหวัด ${res.provinceName}`;
      });
  }

  cancel() {
    if (this.mode == 'view') {
      const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: `คุณต้องการยกเลิกการยื่นคำขอ
          ใช่หรือไม่? `,
          btnLabel: 'ยืนยัน',
        },
      });
      confirmDialog.componentInstance.confirmed
        .pipe(
          switchMap((res) => {
            if (res) {
              const payload: KspRequestProcess = {
                id: `${this.requestId}`,
                process: `${this.requestData.process}`,
                status: '0',
                detail: null,
                userid: null,
                paymentstatus: null,
              };

              return this.requestService.schCancelRequest(payload);
            }
            return EMPTY;
          })
        )
        .subscribe(() => {
          this.onCancelCompleted();
        });
    } else {
      this.router.navigate(['/temp-license', 'list']);
    }
  }

  onSave() {
    const confirmDialog = this.dialog.open(
      QualificationApproveDetailComponent,
      {
        width: '850px',
        data: {
          education: this.form.get('education')?.value,
          mode: this.mode,
          otherreason: this.otherreason,
        },
      }
    );
    confirmDialog.afterClosed().subscribe((res) => {
      if (res) {
        this.saved(res);
      }
    });
  }

  saved(reasonForm: any) {
    const completeDialog = this.dialog.open(
      QualificationApprovePersonComponent,
      {
        width: '850px',
        data: { mode: this.mode, refperson: this.refperson },
      }
    );

    completeDialog.afterClosed().subscribe((res) => {
      if (res) {
        this.onConfirmed(reasonForm, res);
      }
    });
  }

  onConfirmed(reasonForm: any, refPersonForm: any) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่?`,
      },
    });

    confirmDialog.componentInstance.confirmed
      .pipe(
        switchMap((res) => {
          if (res) {
            const formData: any = this.form.getRawValue();
            //console.log('formData', formData);
            if (formData?.addr1?.addressType) formData.addr1.addressType = 1;
            if (formData?.addr2?.addressType) formData.addr2.addressType = 2;
            const { refperson } = refPersonForm;
            const { otherreason } = reasonForm;
            const userInfo: Partial<KspRequest> = formData.userInfo;
            userInfo.ref1 = '2';
            userInfo.ref2 = '06';
            userInfo.ref3 = `${this.careerType}`;
            userInfo.systemtype = '2';
            userInfo.requesttype = '6';
            userInfo.careertype = `${this.careerType}`;
            userInfo.schoolid = this.schoolId;
            userInfo.bureauname = this.bureauName;
            userInfo.schoolname = this.schoolName;
            userInfo.schooladdress = this.address;
            userInfo.process = '2';
            userInfo.status = '1';
            userInfo.birthdate = changeDate(userInfo.birthdate);
            let eduForm = [{ ...formData.edu1, ...{ degreeLevel: 1 } }];
            formData?.edu2
              ? (eduForm = [
                  ...eduForm,
                  { ...formData.edu2, ...{ degreeLevel: 2 } },
                ])
              : null;

            formData?.edu3
              ? (eduForm = [
                  ...eduForm,
                  { ...formData.edu3, ...{ degreeLevel: 3 } },
                ])
              : null;

            formData?.edu4
              ? (eduForm = [
                  ...eduForm,
                  { ...formData.edu4, ...{ degreeLevel: 4 } },
                ])
              : null;

            const file = mapMultiFileInfo(this.evidenceFiles);
            const payload = {
              ...userInfo,
              ...{
                addressinfo: JSON.stringify([formData.addr1, formData.addr2]),
              },
              ...{ eduinfo: JSON.stringify(eduForm) },
              ...{ refperson: JSON.stringify(refperson) },
              ...{ otherreason: JSON.stringify(otherreason) },
              fileinfo: JSON.stringify({ file }),
            };

            const temp = replaceEmptyWithNull(payload);
            return this.requestService.schCreateRequest(temp);
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res) {
          this.onCompleted();
        }
      });
  }

  onClickPrev() {
    this.router.navigate(['/temp-license']);
  }

  onCancelCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: 'ระบบทำการยกเลิกเรียบร้อย',
        content: `วันที่ : ${thaiDate(new Date())}
        เลขที่คำขอ : ${this.requestData.requestno}`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/temp-license', 'list']);
      }
    });
  }

  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: `ระบบทำการบันทึกเรียบร้อยแล้ว
        สามารถตรวจสอบสถานะภายใน
        3 - 15 วันทำการ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/temp-license', 'list']);
      }
    });
  }

  provinceChanged(addrType: number, evt: any) {
    const province = evt.target?.value;
    if (province) {
      if (addrType === 1) {
        this.amphurs1$ = this.addressService.getAmphurs(province);
      } else if (addrType === 2) {
        this.amphurs2$ = this.addressService.getAmphurs(province);
      }
    }
  }

  getAmphurChanged(addrType: number, province: any) {
    if (province) {
      if (addrType === 1) {
        this.amphurs1$ = this.addressService.getAmphurs(province);
      } else if (addrType === 2) {
        this.amphurs2$ = this.addressService.getAmphurs(province);
      }
    }
  }

  amphurChanged(addrType: number, evt: any) {
    const amphur = evt.target?.value;
    if (amphur) {
      if (addrType === 1) {
        this.tumbols1$ = this.addressService.getTumbols(amphur);
      } else if (addrType === 2) {
        this.tumbols2$ = this.addressService.getTumbols(amphur);
      }
    }
  }

  getTumbon(addrType: number, amphur: any) {
    if (amphur) {
      if (addrType === 1) {
        this.tumbols1$ = this.addressService.getTumbols(amphur);
      } else if (addrType === 2) {
        this.tumbols2$ = this.addressService.getTumbols(amphur);
      }
    }
  }

  useSameAddress(evt: any) {
    const checked = evt.target.checked;
    this.amphurs2$ = this.amphurs1$;
    this.tumbols2$ = this.tumbols1$;
    this.provinces2$ = this.provinces1$;
    if (checked) {
      this.form.controls.addr2.patchValue(this.form.controls.addr1.value);
    }
  }
}

const files: FileGroup[] = [
  {
    name: 'หนังสือนำส่งจากหน่วยงานผู้ใช้',
    files: [],
  },
  {
    name: 'สำเนาวุฒิการศึกษาและใบรายงานผลการเรียน',
    files: [],
  },
  {
    name: 'สำเนาวุฒิการศึกษาและใบรายงานผลการเรียน',
    files: [],
  },
  {
    name: 'สำเนาทะเบียนบ้าน',
    files: [],
  },
  {
    name: 'สำเนาหนังสือแจ้งการเทียบคุณวุฒิ (กรณีจบการศึกษาจากต่างประเทศ)',
    files: [],
  },
  {
    name: 'สำเนา กพ.7 / สมุดประจำตัว',
    files: [],
  },
  {
    name: 'สำเนาหลักฐานการเปลี่ยนชื่อ นามสกุล',
    files: [],
  },
  { name: 'เอกสารอื่นๆ', files: [] },
];
