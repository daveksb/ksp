import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VerifyPhoneDialogComponent } from '@ksp/self-service/dialog';
import {
  idCardBackPattern,
  idCardPattern,
  validatorMessages,
} from '@ksp/shared/utility';
import localForage from 'localforage';
import { RegisterTooltipComponent } from '../register-tooltip/register-tooltip.component';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'self-service-register-step-two',
  templateUrl: './register-id-card.component.html',
  styleUrls: ['./register-id-card.component.scss'],
})
export class RegisterIdCardComponent {
  validatorMessages = validatorMessages;
  uniqueNo = '';
  imgSrc = '';
  imgId!: number;

  form = this.fb.group({
    idcardno: [null, [Validators.required, Validators.pattern(idCardPattern)]],
    idcardbackno: [
      null,
      [Validators.required, Validators.pattern(idCardBackPattern)],
    ],
    idcardimage: [],
  });

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.uniqueNo = uuidv4();
  }

  onUploadComplete(evt: any) {
    //console.log('evt = ', evt);
    this.imgSrc = evt.file;
    this.imgId = evt.fileid;
  }

  openDialog() {
    const dialogRef = this.dialog.open(VerifyPhoneDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(() => {
      const data = {
        ...this.form.value,
        ...{ uniquetimestamp: this.uniqueNo },
      };
      localForage.setItem('th-register', data);
    });
  }

  /* nextPage() {
    const data = {
      ...this.form.value,
      ...{ uniquetimestamp: this.uniqueNo },
    };
    localForage.setItem('th-register', data);
    this.router.navigate(['/register', 'th-step-2']);
  } */

  loginPage() {
    this.router.navigate(['/login']);
  }

  previousPage() {
    this.router.navigate(['/register']);
  }

  tooltip1() {
    this.dialog.open(RegisterTooltipComponent, {
      width: '500px',
      data: {
        title: 'ตัวอย่างการกรอกเลขที่หลังบัตร',
        image: '/assets/images/ssn-card.png',
      },
    });
  }

  tooltip2() {
    this.dialog.open(RegisterTooltipComponent, {
      width: '500px',
      data: {
        title: 'ตัวอย่างถ่ายรูปบัตรประชาชน',
        image: '/assets/images/ssn-show.png',
      },
    });
  }

  get idCardNo() {
    return this.form.controls.idcardno;
  }

  get idCardBack() {
    return this.form.controls.idcardbackno;
  }
}
