import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent, ListData } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'self-service-renew-license-foreign-step-two',
  templateUrl: './renew-license-foreign-step-two.component.html',
  styleUrls: ['./renew-license-foreign-step-two.component.scss'],
  providers: providerFactory(RenewLicenseForeignStepTwoComponent),
})
export class RenewLicenseForeignStepTwoComponent
  extends KspFormBaseComponent
  implements OnInit
{
  educationTypes: ListData[] = [];

  selectedEducationType!: number;

  override form = this.fb.group({
    educationType: [null, Validators.required],
    educationLevelForm: [null, Validators.required],
    // teacherInfo: this.fb.array([]),
    // nonTeacherInfo: this.fb.array([]),
  });

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
    this.educationTypes = educationTypes;

    this.form.controls['educationType'].valueChanges
      .pipe(skip(1))
      .subscribe((res) => {
        this.selectedEducationType = Number(res);
        //this.form.controls.educationLevelForm.reset();
      });
  }

  /*  setDefaulFormValue() {

    this.addFormArray(this.nonTeacherInfo);
  } */

  deleteFormArray(form: FormArray<any>, index: number) {
    form.removeAt(index);
  }

  addFormArray(form: FormArray<any>) {
    const data = this.fb.group({ title: [''] });
    form.push(data);
  }

  // get nonTeacherInfo() {
  //   return this.form.controls['nonTeacherInfo'] as FormArray;
  // }
}

const educationTypes = [
  {
    value: 0,
    label: `Individuals Being In-Service Teacher`,
  },
  {
    value: 1,
    label: `Not Being Teacher`,
  },
];
