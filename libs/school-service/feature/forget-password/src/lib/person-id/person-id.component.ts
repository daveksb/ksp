import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';

@Component({
  templateUrl: './person-id.component.html',
  styleUrls: ['./person-id.component.scss'],
})
export class PersonIdComponent {
  form = this.fb.group({
    schoolId: ['', Validators.required],
    personId: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  cancel() {
    this.router.navigate(['/', 'login']);
  }

  accept() {
    if (this.form.valid) {
      this.router.navigate(['/', 'forget-password', 'set-new-password']);
    } else {
      this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: `ไม่พบข้อมูลของท่านภายในระบบ`,
          isDanger: true,
          btnLabel: 'ตรวจสอบอีกครั้ง',
        },
      });
    }
  }
}
