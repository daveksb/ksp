import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterCompletedComponent } from '../register-completed/register-completed.component';
import localForage from 'localforage';
import { MyInfoService } from '@ksp/shared/service';
import { SelfMyInfo } from '@ksp/shared/interface';

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

  idCardNo = '';
  payload!: SelfMyInfo;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private myInfoService: MyInfoService
  ) {
    localForage.getItem('th-register').then((res: any) => {
      this.idCardNo = res.idcardno;
      this.payload = { ...res, ...this.form.value };
      this.payload.username = res.idcardno;
      this.payload.isactive = '1';
      this.payload.uniquetimestamp = res.uniquetimestamp;
      this.payload.usertype = '1'; // ชาวไทย
    });
  }

  submit() {
    this.myInfoService.insertMyInfo(this.payload).subscribe((res) => {
      this.dialog.open(RegisterCompletedComponent, {
        width: '600px',
        data: {
          title: `ยินดีด้วย!`,
          subTitle: `สมัครสมาชิกของท่านเสร็จสมบูรณ์`,
          btnLabel: `เข้าสู่ระบบ`,
        },
      });
    });
  }

  loginPage() {
    this.router.navigate(['/login']);
  }
}
