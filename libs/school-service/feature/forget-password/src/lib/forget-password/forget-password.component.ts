import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/ui/dialog';

@Component({
  selector: 'school-service-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  forgotPasswordForm = this.fb.group({
    schoolId: ['', Validators.required],
    personId: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm.valueChanges.subscribe((res) => {
      //console.log('form value = ', res);
    });
  }

  cancel() {
    this.router.navigate(['/', 'login']);
  }

  accept() {
    console.log('form valid = ', this.forgotPasswordForm.valid);

    if (this.forgotPasswordForm.valid) {
      this.router.navigate(['/', 'forget-password', 'set-password']);
    } else {
      this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: `ไม่พบข้อมูลของท่านภายในระบบ`,
          isDanger: true,
        },
      });
    }
  }
}
