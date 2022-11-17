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
import {
  ConfirmDialogComponent,
  CompleteDialogComponent,
} from '@ksp/shared/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { parseJson } from '@ksp/shared/utility';
import { v4 as uuidv4 } from 'uuid';
import { SelfGetRequest, SelfRequest } from '@ksp/shared/interface';

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
  requestId!: number;
  requestData!: SelfRequest;
  requestNo: string | null = '';
  currentProcess!: number;
  prohibitProperty: any;
  myImage = '';
  imageId = '';

  constructor(
    protected generalInfoService: GeneralInfoService,
    protected addressService: AddressService,
    protected educationDetailService: EducationDetailService,
    protected fb: FormBuilder,
    protected requestService: SelfRequestService,
    protected router: Router,
    protected myInfoService: MyInfoService,
    protected route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        //console.log(this.requestId);
        // this.loadRequestFromId(this.requestId);
        this.requestService.getRequestById(this.requestId).subscribe((res) => {
          if (res) {
            console.log(res);
            this.requestData = res;
            this.requestNo = res.requestno;
            this.currentProcess = Number(res.process);
            this.uniqueTimestamp = res.uniqueno || '';
            //console.log(this.uniqueTimestamp);

            this.patchData(res);
          }
        });
      } else {
        this.initializeFiles();
        this.getMyInfo();
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

  public initializeFiles() {
    this.uniqueTimestamp = uuidv4();
  }

  public getMyInfo() {
    this.myInfoService.getMyInfo().subscribe((res) => {
      if (res) {
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

  public cancel() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยกเลิกรายการใบคำขอ
        ใช่หรือไม่? `,
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.cancelRequest();
      }
    });
  }

  cancelRequest() {
    const payload = {
      id: `${this.requestId}`,
      requeststatus: '0',
    };

    this.requestService.cancelRequest(payload).subscribe((res) => {
      //console.log('Cancel request  = ', res);
      this.cancelCompleted();
    });
  }

  cancelCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: `ยกเลิกใบคำขอสำเร็จ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/home']);
      }
    });
  }

  saveCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        showImg: true,
        header: `บันทึกใบคำขอสำเร็จ`,
        content: `วันที่ :
        เลขที่ใบคำขอ :`,
        subContent: 'หากมีข้อสงสัย กรุณาโทร 02 304 9899',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/home']);
      }
    });
  }

  public save() {
    console.log(this.form.value);
    const confirmDialog = this.dialog.open(ForbiddenPropertyFormComponent, {
      width: '900px',
      data: {
        prohibitProperty: this.prohibitProperty,
        uniqueTimeStamp: this.uniqueTimestamp,
      },
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
        title: `คุณต้องการบันทึกข้อมูลและยื่นคำขอ
        ใช่หรือไม่?`,
        btnLabel: 'บันทึกและยื่นคำขอ',
        cancelBtnLabel: 'บันทึก',
      },
    });

    completeDialog.componentInstance.saved.subscribe((res) => {
      if (res) {
        const payload = this.createRequest(forbidden, 1);
        const request = this.requestId
          ? this.requestService.updateRequest.bind(this.requestService)
          : this.requestService.createRequest.bind(this.requestService);
        request(payload).subscribe((res) => {
          console.log('request result = ', res);
          if (res.returncode === '00') {
            this.saveCompleted();
          }
        });
      }
    });

    completeDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        const payload = this.createRequest(forbidden, 2);
        const request = this.requestId
          ? this.requestService.updateRequest.bind(this.requestService)
          : this.requestService.createRequest.bind(this.requestService);
        request(payload).subscribe((res) => {
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

  public useSameAddress(evt: any) {
    const checked = evt.target.checked;
    if (checked) {
      this.amphurs2$ = this.amphurs1$;
      this.tumbols2$ = this.tumbols1$;
      this.provinces2$ = this.provinces1$;
      this.patchAddress2FormWithAddress1();
    }
  }

  public resetForm() {
    this.form.reset();
  }

  public uploadImageComplete(imageId: string) {
    this.imageId = imageId;
  }

  abstract createRequest(forbidden: any, currentProcess: number): void;
  abstract patchUserInfoForm(data: any): void;
  abstract patchAddress1Form(data: any): void;
  abstract patchAddress2Form(data: any): void;
  abstract patchWorkPlaceForm(data: any): void;
  abstract patchAddress2FormWithAddress1(): void;
}
