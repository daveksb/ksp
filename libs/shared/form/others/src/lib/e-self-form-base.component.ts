import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  AddressService,
  GeneralInfoService,
  EducationDetailService,
  ERequestService,
} from '@ksp/shared/service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { parseJson } from '@ksp/shared/utility';
import {
  KspApprovePersistData,
  KspRequest,
  SelfGetRequest,
} from '@ksp/shared/interface';
import { MatTabChangeEvent } from '@angular/material/tabs';
import localForage from 'localforage';

export const VERIFY_CHOICES = [
  {
    name: 'ครบถ้วน และถูกต้อง',
    value: 'complete',
  },
  {
    name: 'ไม่ครบถ้วน และไม่ถูกต้อง',
    value: 'incomplete',
  },
];
@Component({
  template: ``,
  standalone: true,
})
export abstract class ESelfFormBaseComponent {
  prefixList$!: Observable<any>;
  nationalitys$!: Observable<any>;
  provinces1$!: Observable<any>;
  provinces2$!: Observable<any>;
  provinces3$!: Observable<any>;
  amphurs1$!: Observable<any>;
  tumbols1$!: Observable<any>;
  amphurs2$!: Observable<any>;
  tumbols2$!: Observable<any>;
  amphurs3$!: Observable<any>;
  tumbols3$!: Observable<any>;
  bureau$!: Observable<any>;
  form!: FormGroup;
  requestId!: number;
  requestNo: string | null = '';
  currentProcess!: number;
  prohibitProperty: any;
  myImage = '';
  imageId = '';
  verifyChoice: any[] = VERIFY_CHOICES;
  selectedTab: MatTabChangeEvent = new MatTabChangeEvent();
  requestData = new KspRequest();

  constructor(
    protected generalInfoService: GeneralInfoService,
    protected addressService: AddressService,
    protected educationDetailService: EducationDetailService,
    protected fb: FormBuilder,
    protected requestService: ERequestService,
    protected route: ActivatedRoute
  ) {}

  // save data to indexed db
  static persistData(checkDetail: any, requestData: any) {
    const saveData: KspApprovePersistData = {
      checkDetail,
      requestData,
    };
    localForage.setItem('checkRequestData', saveData);
  }

  static allFilledValidator(): any {
    return (form: FormArray) => {
      const value: any[] = form.value;
      return value.every((v) => v !== null) ? null : { allFilled: true };
    };
  }

  tabChanged(e: MatTabChangeEvent) {
    this.selectedTab = e;
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        this.requestService
          .getKspRequestById(this.requestId)
          .subscribe((res) => {
            if (res) {
              this.requestData = res;
              this.patchData(res);
            }
          });
      }
    });
  }

  patchData(data: SelfGetRequest) {
    this.patchUserInfo(data);
    this.patchAddress(parseJson(data.addressinfo));
    if (data.schooladdrinfo) {
      this.patchWorkplace(parseJson(data.schooladdrinfo));
    }
    if (data.prohibitproperty) {
      this.prohibitProperty = parseJson(data.prohibitproperty);
    }

    if (data.filedata) {
      this.myImage = atob(data.filedata);
    }
  }

  public getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.nationalitys$ = this.generalInfoService.getNationality();
    this.provinces1$ = this.addressService.getProvinces();
    this.provinces2$ = this.provinces1$;
    this.provinces3$ = this.provinces1$;
    this.bureau$ = this.educationDetailService.getBureau();
  }

  public provinceChanged(addrType: number, evt: any) {
    const province = evt.target?.value;
    if (province) {
      if (addrType === 1) {
        this.amphurs1$ = this.addressService.getAmphurs(province);
      } else if (addrType === 2) {
        this.amphurs2$ = this.addressService.getAmphurs(province);
      } else if (addrType === 3) {
        this.amphurs3$ = this.addressService.getAmphurs(province);
      }
    }
  }

  public amphurChanged(addrType: number, evt: any) {
    const amphur = evt.target?.value;
    if (amphur) {
      if (addrType === 1) {
        this.tumbols1$ = this.addressService.getTumbols(amphur);
      } else if (addrType === 2) {
        this.tumbols2$ = this.addressService.getTumbols(amphur);
      } else if (addrType === 3) {
        this.tumbols3$ = this.addressService.getTumbols(amphur);
      }
    }
  }

  patchUserInfo(data: any) {
    const {
      birthdate,
      phone,
      email,
      firstnameen,
      firstnameth,
      idcardno,
      lastnameen,
      lastnameth,
      prefixen,
      prefixth,
      id,
      contactphone,
      workphone,
      sex,
    } = data;
    const patchData = {
      birthdate: birthdate.split('T')[0],
      contactphone: contactphone || phone,
      email,
      firstnameen,
      firstnameth,
      idcardno,
      lastnameen,
      lastnameth,
      prefixen,
      prefixth,
      id,
      workphone,
      sex,
    } as any;
    this.patchUserInfoForm(patchData);
  }

  patchAddress(addrs: any[]) {
    if (addrs && addrs.length) {
      addrs.map((addr: any, i: number) => {
        if (i === 0) {
          this.amphurs1$ = this.addressService.getAmphurs(addr.province);
          this.tumbols1$ = this.addressService.getTumbols(addr.amphur);
          this.patchAddress1Form(addr);
        }
        if (i === 1) {
          this.amphurs2$ = this.addressService.getAmphurs(addr.province);
          this.tumbols2$ = this.addressService.getTumbols(addr.amphur);
          this.patchAddress2Form(addr);
        }
      });
    }
  }

  patchWorkplace(data: any) {
    this.amphurs3$ = this.addressService.getAmphurs(data.province);
    this.tumbols3$ = this.addressService.getTumbols(data.amphur);
    this.patchWorkPlaceForm(data);
  }

  public resetForm() {
    this.form.reset();
  }

  public uploadImageComplete(imageId: string) {
    this.imageId = imageId;
  }

  abstract patchUserInfoForm(data: any): void;
  abstract patchAddress1Form(data: any): void;
  abstract patchAddress2Form(data: any): void;
  abstract patchWorkPlaceForm(data: any): void;
}
