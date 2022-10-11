import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserInfoFormType } from '@ksp/shared/constant';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-form-education-info',
  templateUrl: './form-education-info.component.html',
  styleUrls: ['./form-education-info.component.scss'],
  providers: providerFactory(FormEducationInfoComponent),
})
export class FormEducationInfoComponent
  extends KspFormBaseComponent
  implements OnInit
{
  @Input() showGradeInput = false;
  @Input() showPropertyInput = false;
  @Input() showSelectDegree = false;
  @Input() showGraduateYearInput = false;
  @Input() countries: any[] = [];
  @Input() showCheckbox = true;
  @Input() option = false;
  @Input() userEducationType: any;
  FormTypeEnum = UserInfoFormType;
  today = new Date().toISOString().split('T')[0];

  override form = this.fb.group({
    degreeLevel: [],
    degreeName: [null, Validators.required],
    isEducationDegree: [],
    major: [null, Validators.required],
    institution: [null, Validators.required],
    country: [],
    admissionDate: [],
    graduateDate: [],
    grade: [],
    otherProperty: [],
    academicYear: [],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
    if (this.option) {
      this.form.clearValidators();
    }
  }

  get degreeLevel() {
    return this.form.controls.degreeLevel;
  }
}
