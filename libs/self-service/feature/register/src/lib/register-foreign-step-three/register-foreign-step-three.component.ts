import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormVerifyOtpForeignComponent } from '@ksp/self-service/form';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';
import { RegisterCompletedComponent } from '../register-completed/register-completed.component';

@Component({
  selector: 'ksp-register-foreign-step-three',
  templateUrl: './register-foreign-step-three.component.html',
  styleUrls: ['./register-foreign-step-three.component.scss'],
})
export class RegisterForeignStepThreeComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

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

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onCompleted();
      }
    });
  }

  onCompleted() {
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
