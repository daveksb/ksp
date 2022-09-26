import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AddressService,
  GeneralInfoService,
  EducationDetailService,
  MyInfoService,
  SelfRequestService,
} from '@ksp/shared/service';
import { MatDialog } from '@angular/material/dialog';
import { ForbiddenPropertyFormComponent } from '@ksp/shared/form/others';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';
import { Router } from '@angular/router';
import { parseJson } from '@ksp/shared/utility';

@Component({
  template: ``,
  standalone: true,
})
export abstract class LicenseFormBaseComponent {
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
  uniqueTimestamp!: string;
  //myInfo = new SelfMyInfo();
  myImage = '';

  constructor(
    protected generalInfoService: GeneralInfoService,
    protected addressService: AddressService,
    protected educationDetailService: EducationDetailService,
    protected fb: FormBuilder,
    protected requestService: SelfRequestService,
    protected router: Router,
    protected myInfoService: MyInfoService,
    public dialog: MatDialog
  ) {}

  public initializeFiles() {
    //
  }

  public getMyInfo() {
    this.myInfoService.getMyInfo().subscribe((res) => {
      if (res) {
        //this.myInfo = res;
        if (res && res.filedata) {
          this.myImage = atob(res.filedata);
        }
        this.patchUserInfo(res);
        this.patchAddress(parseJson(res.addressinfo));
        if (res.schooladdrinfo) {
          this.patchWorkplace(parseJson(res.schooladdrinfo));
        }
      }
    });
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

  public save() {
    console.log(this.form.value);
    const confirmDialog = this.dialog.open(ForbiddenPropertyFormComponent, {
      width: '900px',
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onCompleted(res);
      }
    });
  }

  onCompleted(forbidden: any) {
    const completeDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการบันทึกข้อมูลใช่หรือไม่?`,
        btnLabel: 'ยื่นแบบคำขอ',
        cancelBtnLabel: 'บันทึก',
      },
    });

    completeDialog.componentInstance.saved.subscribe((res) => {
      if (res) {
        const payload = this.createRequest(forbidden, 1);
        this.requestService.createRequest(payload).subscribe((res) => {
          console.log('request result = ', res);
          if (res.returncode === '00') {
            this.router.navigate(['/home']);
          }
        });
      }
    });

    completeDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        const payload = this.createRequest(forbidden, 2);
        this.requestService.createRequest(payload).subscribe((res) => {
          console.log('request result = ', res);
          if (res.returncode === '00') {
            this.router.navigate(['/license', 'payment-channel']);
          }
        });
      }
    });
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
    } = data;
    const patchData = {
      birthdate: birthdate.split('T')[0],
      contactphone: phone,
      email,
      firstnameen,
      firstnameth,
      idcardno,
      lastnameen,
      lastnameth,
      prefixen,
      prefixth,
      id,
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
    this.tumbols3$ = this.addressService.getTumbols(data.district);
    this.patchWorkPlaceForm(data);
  }

  public useSameAddress(evt: any) {
    const checked = evt.target.checked;
    if (checked) {
      this.amphurs2$ = this.amphurs1$;
      this.tumbols2$ = this.tumbols1$;
      this.provinces2$ = this.provinces1$;
      this.patchAddress2FormWithAddress1();
    }
  }

  public mapFileInfo(fileList: any[]) {
    return fileList.map((file: any) => {
      const object = {
        fileid: file.fileId || null,
        filename: file.fileName || null,
        name: file.name || null,
      };
      return object;
    });
  }

  abstract createRequest(forbidden: any, currentProcess: number): void;
  abstract patchUserInfoForm(data: any): void;
  abstract patchAddress1Form(data: any): void;
  abstract patchAddress2Form(data: any): void;
  abstract patchWorkPlaceForm(data: any): void;
  abstract patchAddress2FormWithAddress1(): void;
}
