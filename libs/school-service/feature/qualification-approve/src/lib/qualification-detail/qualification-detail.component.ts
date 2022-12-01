import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SchoolRequestSubType, UserInfoFormType } from '@ksp/shared/constant';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import {
  QualificationApproveDetailComponent,
  QualificationApprovePersonComponent,
} from '@ksp/shared/form/others';
import {
  Amphur,
  Country,
  FileGroup,
  FormMode,
  KspRequest,
  KspRequestProcess,
  Nationality,
  Prefix,
  Province,
  Tambol,
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
import localForage from 'localforage';

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
  prefixList$!: Observable<Prefix[]>;
  provinces1$!: Observable<Province[]>;
  provinces2$!: Observable<Province[]>;
  amphurs1$!: Observable<Amphur[]>;
  tumbols1$!: Observable<Tambol[]>;
  amphurs2$!: Observable<Amphur[]>;
  tumbols2$!: Observable<Tambol[]>;
  countries$!: Observable<Country[]>;
  nationalitys$!: Observable<Nationality[]>;
  schoolId = getCookie('schoolId');
  careerType = '';
  requestId!: number;
  requestData = new KspRequest();
  otherreason: any;
  refperson: any;
  evidenceFiles: FileGroup[] = files;
  mode: FormMode = 'edit';
  bureauName!: any;
  schoolName!: any;
  address!: any;
  requestLabel = '';

  isOptional2 = false;
  isOptional3 = false;
  isOptional4 = false;

  showEdu2 = false;
  showEdu3 = false;
  showEdu4 = false;

  checkbox2 = false;
  checkbox3 = false;
  checkbox4 = false;

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
    /* this.form.valueChanges.subscribe((res) => {
      console.log('status2 = ', this.form.controls.edu2.valid);
    }); */
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
        this.careerType = params['subtype'];
      }

      if (Number(this.careerType) == SchoolRequestSubType.ครู) {
        this.requestLabel = SchoolRequestSubType[SchoolRequestSubType.ครู];
      } else if (
        Number(this.careerType) == SchoolRequestSubType.ผู้บริหารสถานศึกษา
      ) {
        this.requestLabel =
          SchoolRequestSubType[SchoolRequestSubType.ผู้บริหารสถานศึกษา];
      } else if (
        Number(this.careerType) == SchoolRequestSubType.ผู้บริหารการศึกษา
      ) {
        this.requestLabel =
          SchoolRequestSubType[SchoolRequestSubType.ผู้บริหารการศึกษา];
      } else if (Number(this.careerType) == SchoolRequestSubType.ศึกษานิเทศก์) {
        this.requestLabel =
          SchoolRequestSubType[SchoolRequestSubType.ศึกษานิเทศก์];
      } else {
        this.requestLabel;
      }
    });
  }

  patchUserInfo(data: any) {
    /*     data.birthdate = data?.birthdate?.split('T')[0];
    data.passportstartdate = data.passportstartdate.split('T')[0];
    data.passportenddate = data.passportenddate.split('T')[0]; */
    //console.log('data = ', data);
    /*     if (data?.visainfo) {
      const visa = parseJson(data?.visainfo);
      data.visaclass = visa.visaclass;
      data.visatype = visa.visatype;
      data.visaenddate = visa.visaenddate;
    } */
    //console.log('data = ', data);
    this.form.controls.userInfo.patchValue(data);
  }

  searchStaffFromIdCard(idCard: string) {
    if (!idCard || this.requestId) return;
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
          this.patchUserInfo(res);
          this.patchAddress(parseJson(res.addresses));
          this.patchEdu(parseJson(res.educations));
        } else {
          // search not found reset form and set idcard again
          this.form.reset();
          const temp: any = { idcardno: idCard };
          this.form.controls.userInfo.patchValue(temp);
          //this.searchIdCardNotFound();
        }
      });
  }

  patchAddress(addressinfo: any[]) {
    if (addressinfo) {
      for (let i = 0; i < addressinfo.length; i++) {
        const form = this.form.get(`addr${i + 1}`) as AbstractControl<any, any>;
        this.getAmphurChanged(i + 1, addressinfo[i].province);
        this.getTumbon(i + 1, addressinfo[i].amphur);
        form?.patchValue(addressinfo[i]);
      }
    }
  }

  loadRequestData(id: number) {
    this.requestService.schGetRequestById(id).subscribe((req) => {
      if (req) {
        req.birthdate = formatDate(req.birthdate);
        req.isforeign = req.isforeign ? '1' : '0';

        //console.log('xx = ', req);
        //this.form.controls.userInfo.patchValue(<any>req);
        this.patchUserInfo(req);
        this.patchAddress(parseJson(req.addressinfo));
        this.patchEdu(parseJson(req.eduinfo));

        const json = parseJson(req.fileinfo);
        if (json && json.file && Array.isArray(json.file)) {
          this.evidenceFiles.forEach(
            (group, index) => (group.files = json.file[index])
          );
        }

        req.refperson
          ? (req.refperson = JSON.parse(atob(req.refperson)))
          : null;

        req.otherreason
          ? (req.otherreason = JSON.parse(atob(req.otherreason)))
          : null;

        this.refperson = req.refperson;
        this.otherreason = req.otherreason;
        if (req.process === '3') {
          this.mode = 'view';
        } else if (req.process === '2' && req.status === '2') {
          this.mode = 'edit';
        }
      }
    });
  }

  patchEdu(edus: any[]) {
    //console.log('edus = ', edus);
    if (edus && edus.length) {
      edus.map((edu, i) => {
        if (edu.degreeLevel === '2') {
          this.showEdu2 = true;
          this.checkbox2 = true;
        }
        if (edu.degreeLevel === '3') {
          this.showEdu3 = true;
          this.checkbox3 = true;
        }
        if (edu.degreeLevel === '4') {
          this.showEdu4 = true;
          this.checkbox4 = true;
        }
        (this.form.get(`edu${i + 1}`) as AbstractControl<any, any>).patchValue(
          edu
        );
        //console.log('edu1 = ', edu.degreeLevel);
      });
    }
  }

  eduSelected(type: number, evt: any) {
    const checked = evt.target.checked;
    if (type === 2) {
      this.showEdu2 = checked;
      this.isOptional2 = checked;
    }
    if (type === 3) {
      this.showEdu3 = checked;
      this.isOptional3 = checked;
    }
    if (type === 4) {
      this.showEdu4 = checked;
      this.isOptional4 = checked;
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
        this.address = `เลขที่ ${res.address} ซอย ${res?.street ?? ''} หมู่ ${
          res?.moo ?? ''
        } ถนน ${res?.road ?? ''} ตำบล ${res.tumbon} อำเภอ ${
          res.amphurName
        } จังหวัด ${res.provinceName} รหัสไปรษณีย์ ${res.zipcode}`;
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
                requestid: `${this.requestId}`,
                process: `${this.requestData.process}`,
                status: '0',
                detail: null,
                userid: null,
                paymentstatus: null,
              };

              return this.requestService.schUpdateRequestProcess(payload);
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
          education: this.form.get('edu1')?.value,
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
            userInfo.ref3 = this.careerType;
            userInfo.systemtype = '2';
            userInfo.requesttype = '6';
            userInfo.careertype = this.careerType;
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

  searchIdCardNotFound() {
    const dialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: `ไม่พบข้อมูลบุคลากรภายในหน่วยงาน
        จากหมายเลขบัตรประจำตัวประชาชนที่ระบุ`,
        buttonLabel: 'กลับสู่หน้าหลัก',
      },
    });

    dialog.componentInstance.completed
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        if (res) {
          this.router.navigate(['/staff-management', 'list']);
        }
      });
  }

  backToListPage() {
    this.router.navigate(['/temp-license', 'list']);
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
