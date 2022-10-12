import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { FileGroup, FormMode } from '@ksp/shared/interface';
import { GeneralInfoService } from '@ksp/shared/service';
import { Observable } from 'rxjs';
import localForage from 'localforage';
import { thaiDate } from '@ksp/shared/utility';
import { v4 as uuidv4 } from 'uuid';
@Component({
  templateUrl: './register-coordinator.component.html',
  styleUrls: ['./register-coordinator.component.scss'],
})
export class CoordinatorInfoComponent implements OnInit {
  form = this.fb.group({
    coordinator: [],
  });
  savingData: any;
  uploadFileList: FileGroup[] = [
    {
      name: 'หนังสือแต่งตั้งผู้ประสานงาน',
      files: [],
    },
    {
      name: 'สำเนาบัตรประชาชน',
      files: [],
    },
  ];
  requestDate = thaiDate(new Date());
  requestNumber = '';

  prefixList$!: Observable<any>;
  nationalitys$!: Observable<any>;
  mode: FormMode = 'edit';
  userInfoFormdisplayMode: number = UserInfoFormType.thai;
  school: any;
  address: any;
  uniqueTimestamp: any;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService
  ) {}

  ngOnInit(): void {
    this.getListData();

    localForage.getItem('registerSelectedSchool').then((res) => {
      this.school = res;
      console.log('school = ', res);
    });

    localForage.getItem('registerUserInfoFormValue').then((res) => {
      this.savingData = res;
    });

    localForage.getItem('registerSelectedSchool').then((res: any) => {
      this.address = `บ้านเลขที่ ${res.address} ซอย ${res?.street ?? ''} หมู่ ${
        res?.moo ?? ''
      } ถนน ${res?.road ?? ''} ตำบล ${res.tumbon} อำเภอ ${
        res.amphurName
      } จังหวัด ${res.provinceName}`;
    });

    this.uniqueTimestamp = uuidv4();
  }
  getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.nationalitys$ = this.generalInfoService.getNationality();
  }

  cancel() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยกเลิกรายการใบคำขอ
        ใช่หรือไม่?`,
        btnLabel: 'ยืนยัน',
      },
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onConfirmed();
      }
    });
  }

  onConfirmed() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: 'ยกเลิกรายการสำเร็จ',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'login']);
      }
    });
  }

  back() {
    this.router.navigate(['register', 'requester']);
  }

  save() {
    localForage.setItem('registerCoordinatorInfoFormValue', this.form.value);
    this.router.navigate(['/register', 'password']);
  }
}
