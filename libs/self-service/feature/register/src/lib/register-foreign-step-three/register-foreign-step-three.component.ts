import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';
import { MyInfoService } from '@ksp/shared/service';
import { switchMap, EMPTY } from 'rxjs';
import { RegisterCompletedComponent } from '../register-completed/register-completed.component';
import localForage from 'localforage';
import { SelfMyInfo } from '@ksp/shared/interface';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'self-service-register-foreign-step-three',
  templateUrl: './register-foreign-step-three.component.html',
  styleUrls: ['./register-foreign-step-three.component.scss'],
})
export class RegisterForeignStepThreeComponent implements OnInit {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private myInfoService: MyInfoService
  ) {}
  savingData: any;
  form = this.fb.group({
    password: [],
    username: [],
  });
  loginPage() {
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    localForage.getItem('registerForeigner').then((res: any) => {
      this.savingData = res;
    });
  }
  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `Confirm?`,
        subTitle: `You want to save this information`,
        btnLabel: 'Submit',
        cancelBtnLabel: 'Cancel',
      },
    });

    confirmDialog.componentInstance.confirmed
      .pipe(
        switchMap((res) => {
          if (res) {
            const payload: SelfMyInfo = {
              ...this.savingData,
              ...this.form.value,
            };
            payload.usertype = '2'; // ครูต่างชาติ
            payload.isactive = '1';
            payload.uniquetimestamp = uuidv4();

            return this.myInfoService.insertMyInfo(payload);
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res) {
          this.onCompleted();
        }
      });
  }

  onCompleted() {
    localForage.removeItem('registerUserForm');
    this.dialog.open(RegisterCompletedComponent, {
      width: '600px',
      data: {
        title: `Success`,
        subTitle: `Register Successfully`,
        btnLabel: `Login`,
      },
    });
  }
}
