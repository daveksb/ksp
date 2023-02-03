import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent, ListData } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { skip } from 'rxjs';

@Component({
  selector: 'self-service-renew-license-property',
  templateUrl: './renew-license-property.component.html',
  styleUrls: ['./renew-license-property.component.scss'],
  providers: providerFactory(RenewLicensePropertyComponent),
})
export class RenewLicensePropertyComponent
  extends KspFormBaseComponent
  implements OnInit
{
  @Input() renewLicenseTypes: 'schManager' | 'eduManager' | 'supervision' =
    'schManager';
  @Input() uniqueTimestamp = '';
  @Input() workingInfo: any[] = [];

  selectedEducationType!: number;

  override form = this.fb.group({
    educationType: [null, Validators.required],
    educationLevelForm: [null, Validators.required],
  });

  educationTypes1: ListData[] = [];
  educationTypes2: ListData[] = [];
  educationTypes3: ListData[] = [];

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
    this.educationTypes1 = educationTypes1;
    this.educationTypes2 = educationTypes2;
    this.educationTypes3 = educationTypes3;

    this.form.controls['educationType'].valueChanges
      .pipe(skip(1))
      .subscribe((res) => {
        this.selectedEducationType = Number(res);
        //this.form.controls.educationLevelForm.reset();
      });
  }

  override set value(value: any) {
    this.form.patchValue(value);
    this.onChange(value);
    this.onTouched();
  }
}

const educationTypes1 = [
  {
    value: 0,
    label: `ผู้ประกอบวิชาชีพผู้บริหารสถานศึกษา`,
  },
  {
    value: 1,
    label: `ผู้มิได้ประกอบวิชาชีพผู้บริหารสถานศึกษา`,
  },
];

const educationTypes2 = [
  {
    value: 0,
    label: `ผู้ประกอบวิชาชีพผู้บริหารการศึกษา`,
  },
  {
    value: 1,
    label: `ผู้มิได้ประกอบวิชาชีพผู้บริหารการศึกษา`,
  },
];

const educationTypes3 = [
  {
    value: 0,
    label: `ผู้ประกอบวิชาชีพศึกษานิเทศก์`,
  },
  {
    value: 1,
    label: `ผู้มิได้ประกอบวิชาชีพศึกษานิเทศก์`,
  },
];
