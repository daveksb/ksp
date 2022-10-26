import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import {
  FileGroup,
  FormMode,
  Nationality,
  Prefix,
} from '@ksp/shared/interface';
import { GeneralInfoService } from '@ksp/shared/service';
import { Observable } from 'rxjs';
import localForage from 'localforage';
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
  prefixList$!: Observable<Prefix[]>;
  nationList$!: Observable<Nationality[]>;
  mode: FormMode = 'edit';
  userInfoFormdisplayMode: number = UserInfoFormType.thai;
  school: any;
  address: any;
  uniqueNo!: string;
  uploadFiles: FileGroup[] = [
    {
      name: 'หนังสือแต่งตั้งผู้ประสานงาน',
      files: [],
    },
    {
      name: 'สำเนาบัตรประชาชน',
      files: [],
    },
  ];

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
      //console.log('school = ', res);
    });

    localForage.getItem('registerUserInfoFormValue').then((res) => {
      this.savingData = res;
    });

    localForage.getItem('registerSelectedSchool').then((res: any) => {
      this.address = `บ้านเลขที่ ${res.address} ซอย ${
        res?.street ?? '-'
      } หมู่ ${res?.moo ?? '-'} ถนน ${res?.road ?? '-'} ตำบล ${
        res.tumbon
      } อำเภอ ${res.amphurname} จังหวัด ${res.provincename}`;
    });

    this.uniqueNo = uuidv4();
  }

  getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.nationList$ = this.generalInfoService.getNationality();
  }

  cancelConfirmDialog() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยกเลิกรายการใบคำขอ
        ใช่หรือไม่?`,
        btnLabel: 'ยืนยัน',
      },
    });

    dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.cancelCompleteDialog();
      }
    });
  }

  cancelCompleteDialog() {
    const dialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: 'ยกเลิกรายการสำเร็จ',
      },
    });

    dialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/login']);
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
