import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';
import { SchForgetPassword } from '@ksp/shared/interface';
import { SchoolInfoService } from '@ksp/shared/service';
import { idCardPattern } from '@ksp/shared/utility';

@Component({
  templateUrl: './person-id.component.html',
  styleUrls: ['./person-id.component.scss'],
})
export class PersonIdComponent {
  form = this.fb.group({
    schoolid: [null, Validators.required],
    idcardno: [null, [Validators.required, Validators.pattern(idCardPattern)]],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private service: SchoolInfoService
  ) {}

  cancel() {
    this.router.navigate(['/login']);
  }

  accept() {
    const form: any = this.form.getRawValue();

    const payload: SchForgetPassword = {
      idcardno: form.idcardno,
      schoolid: form.schoolid,
      schpassword: null,
    };

    this.service.checkForgetPassword(payload).subscribe((res) => {
      console.log('res = ', res);
      if (res) {
        this.router.navigate(['/forget-password', 'set-new-password']);
      } else {
        this.notFoundDialog();
      }
    });
  }

  notFoundDialog() {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `ไม่พบข้อมูลของท่านภายในระบบ`,
        isDanger: true,
        btnLabel: 'ตรวจสอบอีกครั้ง',
      },
    });
  }
}
