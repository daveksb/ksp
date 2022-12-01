import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';
import { SchForgetPassword } from '@ksp/shared/interface';
import { LoaderService, SchoolUserService } from '@ksp/shared/service';
import { idCardPattern } from '@ksp/shared/utility';
import localForage from 'localforage';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './person-id.component.html',
  styleUrls: ['./person-id.component.scss'],
})
export class PersonIdComponent {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  form = this.fb.group({
    schoolid: [null, Validators.required],
    idcardno: [null, [Validators.required, Validators.pattern(idCardPattern)]],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private userService: SchoolUserService,
    private loaderService: LoaderService
  ) {}

  cancel() {
    this.router.navigate(['/login']);
  }

  accept() {
    const form: any = this.form.getRawValue();

    const payload: SchForgetPassword = {
      idcardno: form.idcardno,
      schoolid: form.schoolid,
    };

    localForage.setItem('schSetNewPassword', payload);

    this.userService.checkForgetPassword(payload).subscribe((res) => {
      if (res.returncode === '1') {
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
