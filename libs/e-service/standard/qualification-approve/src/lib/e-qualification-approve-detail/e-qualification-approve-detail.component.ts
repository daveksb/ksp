import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import {
  Amphur,
  Country,
  FileGroup,
  KspApprovePersistData,
  KspRequest,
  Nationality,
  Prefix,
  Province,
  Tambol,
} from '@ksp/shared/interface';
import {
  AddressService,
  ERequestService,
  GeneralInfoService,
} from '@ksp/shared/service';
import { formatDate, parseJson } from '@ksp/shared/utility';
import { Observable } from 'rxjs';
import localForage from 'localforage';
import { MatTabChangeEvent } from '@angular/material/tabs';
@Component({
  selector: 'ksp-e-qualification-approve-detail',
  templateUrl: './e-qualification-approve-detail.component.html',
  styleUrls: ['./e-qualification-approve-detail.component.scss'],
})
export class EQualificationApproveDetailComponent implements OnInit {
  file = files;
  choice = verifyChoices;

  requestData = new KspRequest();
  userInfoFormdisplayMode: number = UserInfoFormType.thai;
  prefixList$!: Observable<Prefix[]>;
  provinces1$!: Observable<Province[]>;
  amphurs1$!: Observable<Amphur[]>;
  tumbols1$!: Observable<Tambol[]>;
  amphurs2$!: Observable<Amphur[]>;
  tumbols2$!: Observable<Tambol[]>;
  countries$!: Observable<Country[]>;
  nationalitys$!: Observable<Nationality[]>;
  showEdu2 = false;
  showEdu3 = false;
  showEdu4 = false;
  bureauname = '';
  schoolname = '';
  selectedTab: MatTabChangeEvent = new MatTabChangeEvent();
  refPerson: any;
  otherReason: any;

  form = this.fb.group({
    userInfo: [],
    addr1: [],
    addr2: [],
    edu1: [],
    edu2: [],
    edu3: [],
    edu4: [],
    checkResult: this.fb.array([]),
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private eRequestService: ERequestService,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.checkRequestId();
    this.getListData();
    this.addCheckResultArray();
  }

  addCheckResultArray() {
    for (let i = 0; i < 5; i++) {
      this.checkResultFormArray.push(this.fb.control([]));
    }
  }

  tabChanged(e: MatTabChangeEvent) {
    //console.log('tab event = ', e);
    this.selectedTab = e;
  }

  get checkResultFormArray() {
    return this.form.controls.checkResult as FormArray;
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      const requestId = Number(params.get('id'));
      if (requestId) {
        this.loadRequestData(requestId);
      }
    });
  }

  navigateBack() {
    this.router.navigate(['/qualification-approve', 'list']);
  }

  next() {
    this.persistData();
    this.router.navigate([
      '/qualification-approve',
      'confirm',
      this.requestData.id,
    ]);
  }

  // save data to indexed db
  persistData() {
    //console.log('check sub result = ', checkSubResult);
    const saveData: KspApprovePersistData = {
      checkDetail: this.form.controls.checkResult.value,
      requestData: this.requestData,
    };
    localForage.setItem('checkRequestData', saveData);
    //localForage.setItem('qualification-check-request-data', saveData);
  }

  loadRequestData(id: number) {
    this.eRequestService.getKspRequestById(id).subscribe((res) => {
      if (res) {
        this.requestData = res;
        this.bureauname = res.bureauname || '';
        this.schoolname = res.schoolname || '';
        res.birthdate = formatDate(res.birthdate);

        this.form.controls.userInfo.patchValue(<any>res);
        const edus = parseJson(res.eduinfo);
        console.log('edu = ', edus[0]);
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
          files.forEach((group, index) => (group.files = json.file[index]));
        }

        res.refperson
          ? (this.refPerson = JSON.parse(atob(res.refperson)))
          : null;

        res.otherreason
          ? (this.otherReason = JSON.parse(atob(res.otherreason)))
          : null;

        console.log('ref = ', this.refPerson);
        console.log('other = ', this.otherReason);
      }
    });
  }

  /* patchRefPerson(res: any) {
    this.refPerson = res;
  } */

  /* patchOtherReason(res: any) {
    this.resPerson = res;
  } */

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
    this.countries$ = this.addressService.getCountry();
    this.nationalitys$ = this.generalInfoService.getNationality();
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

  getTumbon(addrType: number, amphur: any) {
    if (amphur) {
      if (addrType === 1) {
        this.tumbols1$ = this.addressService.getTumbols(amphur);
      } else if (addrType === 2) {
        this.tumbols2$ = this.addressService.getTumbols(amphur);
      }
    }
  }
}

const verifyChoices = [
  {
    name: 'ครบถ้วน และถูกต้อง',
    value: 2,
  },
  {
    name: 'ไม่ครบถ้วน และไม่ถูกต้อง',
    value: 3,
  },
];

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
