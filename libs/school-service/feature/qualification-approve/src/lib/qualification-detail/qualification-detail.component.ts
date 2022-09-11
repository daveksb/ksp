import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import {
  QualificationApproveDetailComponent,
  QualificationApprovePersonComponent,
} from '@ksp/shared/form/others';
import { AddressService, GeneralInfoService } from '@ksp/shared/service';
import { thaiDate } from '@ksp/shared/utility';
import { Observable } from 'rxjs';
import { RequestType } from '@ksp/shared/interface';

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
    education: [],
    reasoninfo: [],
  });
  requestNumber = '';
  userInfoFormdisplayMode: number = RequestType.ขอหนังสือรับรองคุณวุฒิ;
  prefixList$!: Observable<any>;
  provinces1$!: Observable<any>;
  provinces2$!: Observable<any>;
  amphurs1$!: Observable<any>;
  tumbols1$!: Observable<any>;
  amphurs2$!: Observable<any>;
  tumbols2$!: Observable<any>;
  countries$!: Observable<any>;
  requestDate = thaiDate(new Date());
  evidenceFiles = [
    'หนังสือนำส่งจากหน่วยงานผู้ใช้',
    'สำเนาวุฒิการศึกษาและใบรายงานผลการเรียน',
    'สำเนาวุฒิการศึกษาและใบรายงานผลการเรียน',
    'สำเนาทะเบียนบ้าน',
    'สำเนา กพ.7 / สมุดประจำตัว',
    'สำเนาหนังสือแจ้งการเทียบคุณวุฒิ (กรณีจบการศึกษาจากต่างประเทศ)',
    'สำเนาหลักฐานการเปลี่ยนชื่อ นามสกุล',
    'เอกสารอื่นๆ',
  ];

  ngOnInit(): void {
    this.getListData();
  }
  getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.provinces1$ = this.addressService.getProvinces();
    this.provinces2$ = this.provinces1$;
    this.countries$ = this.addressService.getCountry();
  }
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService
  ) {}

  cancel() {
    this.router.navigate(['/temp-license', 'list']);
  }

  onSave() {
    const confirmDialog = this.dialog.open(
      QualificationApproveDetailComponent,
      {
        width: '850px',
        data: this.form.get('education')?.value,
      }
    );
    confirmDialog.afterClosed().subscribe((res: any) => {
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
      }
    );

    completeDialog.afterClosed().subscribe((res) => {
      if (res) {
        this.onConfirmed(reasonForm, res);
      }
    });
  }

  onConfirmed(reasonForm: any, refPersonForm: any) {
    console.log(refPersonForm, refPersonForm);
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่?`,
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      console.log(res);
      if (res) {
        //eduInfo otherReason addressinfo refPerson
        console.log(reasonForm);
        console.log(refPersonForm);
        console.log(this.form.value);
        this.onCompleted();
      }
    });
  }

  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: `ระบบทำการบันทึกเรียบร้อยแล้ว
        สามารถตรวจสอบสถานะภายใน
        3 - 15 วันทำการ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.cancel();
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
