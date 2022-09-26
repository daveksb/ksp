import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterCompletedComponent } from '../register-completed/register-completed.component';
import localForage from 'localforage';
import { MyInfoService } from '@ksp/shared/service';

@Component({
  selector: 'self-service-register-step-three',
  templateUrl: './register-step-three.component.html',
  styleUrls: ['./register-step-three.component.scss'],
})
export class RegisterStepThreeComponent {
  form = this.fb.group({
    password: [],
    //confirmPassword: [],
  });

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private myInfoService: MyInfoService
  ) {}

  submit() {
    localForage.getItem('th-register').then((res: any) => {
      const payload = { ...res, ...this.form.value };
      payload.username = res.idcardno;
      payload.isactive = '1';
      this.myInfoService.insertMyInfo(payload).subscribe((res) => {
        //console.log('insert = ', res);
      });
      //localForage.setItem('th-register', data);
    });

    this.dialog.open(RegisterCompletedComponent, {
      width: '600px',
      data: {
        title: `ยินดีด้วย!`,
        subTitle: `สมัครสมาชิกของท่านเสร็จสมบูรณ์`,
        btnLabel: `เข้าสู่ระบบ`,
      },
    });
  }

  loginPage() {
    this.router.navigate(['/login']);
  }
}
