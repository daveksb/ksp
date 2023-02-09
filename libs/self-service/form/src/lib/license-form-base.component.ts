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
import {
  formatRequestNo,
  getCookie,
  parseJson,
  thaiDate,
} from '@ksp/shared/utility';
import { v4 as uuidv4 } from 'uuid';
import {
  Amphur,
  Bureau,
  KspComment,
  KspRequestCancelPayload,
  Nationality,
  Prefix,
  Province,
  SelfGetRequest,
  SelfMyInfo,
  SelfRequest,
  Tambol,
} from '@ksp/shared/interface';

@Component({
  template: ``,
  standalone: true,
})
export abstract class LicenseFormBaseComponent {
  prefixList$!: Observable<Prefix[]>;
  nationalitys$!: Observable<Nationality[]>;
  provinces1$!: Observable<Province[]>;
  amphurs1$!: Observable<Amphur[]>;
  tumbols1$!: Observable<Tambol[]>;
  amphurs2$!: Observable<Amphur[]>;
  tumbols2$!: Observable<Tambol[]>;
  amphurs3$!: Observable<Amphur[]>;
  tumbols3$!: Observable<Tambol[]>;
  bureau$!: Observable<Bureau[]>;
  form!: FormGroup;
  uniqueTimestamp!: string;
  requestId!: number;
  //requestData!: SelfRequest;
  requestData = new SelfRequest('1', '01', '1');
  requestNo: string | null = '';
  requestDate: string | null = '';
  currentProcess!: number;
  currentStatus!: number;
  prohibitProperty: any;
  myImage = '';
  imageId = '';
  myInfo$!: Observable<SelfMyInfo>;
  kspComment = new KspComment();

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
        // this.loadRequestFromId(this.requestId);
        this.requestService.getRequestById(this.requestId).subscribe((res) => {
          if (res) {
            if (res.detail) {
              // in case of having commentss
              this.kspComment = parseJson(res.detail);
            }
            this.requestData = res;
            this.requestNo = res.requestno;
            this.requestDate = res.requestdate;
            this.currentProcess = Number(res.process);
            this.currentStatus = Number(res.status);
            this.uniqueTimestamp = res.uniqueno || '';
            this.patchData(res);
          }
        });
      } else {
        this.initializeFiles();
        this.getMyInfo();
      }
    });
    this.myInfo$ = this.myInfoService.getMyInfo();
  }

  patchData(data: SelfGetRequest) {
    console.log('patchData', data);
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
      data: {
        title: `คุณต้องการยกเลิกรายการแบบคำขอ
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
    const payload: KspRequestCancelPayload = {
      requestid: `${this.requestId}`,
      process: `${this.currentProcess}`,
      userid: getCookie('userId'),
    };

    this.requestService.cancelRequest(payload).subscribe((res) => {
      this.cancelCompleted();
    });
  }

  sameIdCardDialog() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: `หมายเลขบัตรประชาชนนี้ได้ถูกใช้ยื่นแบบคำขอไปแล้ว`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/home']);
      }
    });
  }

  cancelCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: `ยกเลิกแบบคำขอสำเร็จ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/home']);
      }
    });
  }

  saveCompleted(request: any) {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        showImg: true,
        header: `บันทึกแบบคำขอสำเร็จ`,
        content: `วันที่ : ${thaiDate(new Date())}
        เลขที่แบบคำขอ : ${formatRequestNo(
          request.requestno || this.requestNo
        )}`,
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
    //console.log(this.form.value);
    const confirmDialog = this.dialog.open(ForbiddenPropertyFormComponent, {
      width: '900px',
      data: {
        title: `ขอรับรองว่าข้าพเจ้ามีคุณสมบัติครบถ้วนตามที่พระราชบัญญัติสภาครูและบุคลากรทางการศึกษา
        พ.ศ. 2546 ข้อบังคับคุรุสภาว่าด้วยหนังสืออนุญาตประกอบวิชาชีพ พ.ศ. 2547 กำหนดไว้ทุกประการ
        และขอแจ้งประวัติ ดังนี้ `,
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
          if (res.returncode === '00') {
            this.saveCompleted(res);
          } else if (res.returncode === '409') {
            this.sameIdCardDialog();
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
          //console.log('request confirm = ', res);
          if (res.returncode === '00') {
            if (this.currentProcess > 2) {
              this.saveCompleted(res);
            } else {
              this.router.navigate([
                '/license',
                'payment-channel',
                payload.id ? payload.id : res.id,
              ]);
            }
          } else if (res.returncode === '409') {
            this.sameIdCardDialog();
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
      this.patchAddress2FormWithAddress1();
    }
  }

  public resetForm() {
    this.form.reset();
  }

  public uploadImageComplete(imageId: string) {
    this.imageId = imageId;
  }

  abstract createRequest(forbidden: any, currentProcess: number): any;
  abstract patchUserInfoForm(data: any): void;
  abstract patchAddress1Form(data: any): void;
  abstract patchAddress2Form(data: any): void;
  abstract patchWorkPlaceForm(data: any): void;
  abstract patchAddress2FormWithAddress1(): void;
}
