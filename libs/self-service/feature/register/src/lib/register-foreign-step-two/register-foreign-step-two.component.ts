import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VisaClass, VisaType } from '@ksp/shared/interface';
import { GeneralInfoService } from '@ksp/shared/service';
import { formatDatePayload } from '@ksp/shared/utility';
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
    private router: Router,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService
  ) {}
  visaClassList$!: Observable<VisaClass[]>;
  visaTypeList$!: Observable<VisaType[]>;
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

    localForage.getItem('registerForeigner').then((res: any) => {
      //console.log('load data x = ', res);
      this.form.patchValue(formatDatePayload(res));
      const data = { ...res, ...this.form.value };
      localForage.setItem('registerForeigner', data);
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
