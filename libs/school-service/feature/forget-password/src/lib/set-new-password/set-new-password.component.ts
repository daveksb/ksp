import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { validatorMessages } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.scss'],
})
export class SetNewPasswordComponent implements OnInit {
  eyeIconClicked = false;
  eyeIconClickedSecond = false;
  validatorMessages = validatorMessages;

  form = this.fb.group({
    password: [null, [Validators.required, Validators.minLength(8)]],
    rePassword: [null, [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  get disableBtn() {
    const { password, rePassword } = this.form.getRawValue();
    this.validatorMessages.passwordNotMatching;
    return password !== rePassword || !password || !rePassword;
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((res) => {
      //console.log('form value = ', res);
    });
  }

  navigateBack() {
    this.router.navigate(['/login']);
  }

  accept() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        subTitle: `คุณยืนยันข้อมูลใช่หรือไม่? `,
        btnLabel: `ใช่`,
        cancelBtnLabel: 'ไม่ใช่',
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
      data: {
        header: `ทำรายการสำเร็จ`,
        subContent: `ระบบได้ทำการเปลี่ยนรหัสผ่านให้ท่านเรียบร้อยแล้ว
        กรุณาเข้าสู่ระบบใหม่อีกครั้ง`,
        btnLabel: 'เข้าสู่ระบบ',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.navigateBack();
      }
    });
  }
}
