import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { SelfMyInfo } from '@ksp/shared/interface';
import { MyInfoService } from '@ksp/shared/service';
import { thaiDate } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-refund-fee-request',
  templateUrl: './refund-fee-request.component.html',
  styleUrls: ['./refund-fee-request.component.scss'],
})
export class RefundFeeRequestComponent implements OnInit {
  files = [{ name: '1.สำเนาวุฒิการศึกษา', fileId: '' }];
  headerGroup = ['วันที่ทำรายการ', 'เลขใบคำขอ'];
  userInfoType = UserInfoFormType.thai;
  today = thaiDate(new Date());
  userInfo!: SelfMyInfo;

  form = this.fb.group({
    userInfo: [],
    refundInfo: [],
  });

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private myInfoService: MyInfoService
  ) {}

  ngOnInit(): void {
    this.myInfoService.getMyInfo().subscribe((res) => {
      //console.log('my info = ', res);
      this.userInfo = res;
      this.form.controls.userInfo.patchValue(<any>this.userInfo);
    });
  }

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onCompleted();
      }
    });
  }

  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '375px',
      data: {
        header: `บันทึกข้อมูลสำเร็จ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/home']);
      }
    });
  }
}
