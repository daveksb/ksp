import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VerifyOtpForeignDialogComponent } from '@ksp/self-service/dialog';
import { GeneralInfoService } from '@ksp/shared/service';
import localForage from 'localforage';
import { Observable } from 'rxjs';
@Component({
  selector: 'self-service-register-foreign-step-two',
  templateUrl: './register-foreign-step-two.component.html',
  styleUrls: ['./register-foreign-step-two.component.scss'],
})
export class RegisterForeignStepTwoComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private router: Router, //private fb: FormBuilder,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService
  ) {}
  visaClassList$!: Observable<any>;
  visaTypeList$!: Observable<any>;
  form = this.fb.group({
    idcardno: [],
    passportno: [],
    passportstartdate: [],
    passportenddate: [],
    visaclass: [],
    visatype: [],
    visaenddate: [],
  });

  ngOnInit() {
    this.visaClassList$ = this.generalInfoService.getVisaClass();
    this.visaTypeList$ = this.generalInfoService.getVisaType();
  }
  openDialog() {
    const dialogRef = this.dialog.open(VerifyOtpForeignDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      localForage.getItem('registerForeigner').then((res: any) => {
        const data = { ...res, ...this.form.value };
        localForage.setItem('registerForeigner', data);
        this.nextStep();
      });
    });
  }
  nextStep() {
    this.router.navigate(['/register', 'en-step-3']);
  }
  loginPage() {
    this.router.navigate(['/login']);
  }

  previousPage() {
    this.router.navigate(['/register', 'step-1']);
  }
}
