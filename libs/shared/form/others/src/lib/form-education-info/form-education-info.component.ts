import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserInfoFormType } from '@ksp/shared/constant';
import { Country, KspFormBaseComponent } from '@ksp/shared/interface';
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
  @Input() countries: Country[] | null = [];
  @Input() showCheckbox = true;
  @Input() isOptional = false;
  @Input() isDarkMode = true;
  @Input() userEducationType: any;
  @Input() UniversityList: any[] = [];

  FormTypeEnum = UserInfoFormType;

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
    institutionApprove: [],
    institutionWebsite: [],
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
    this.optionalEdu();
  }

  get degreeLevel() {
    return this.form.controls.degreeLevel;
  }

  optionalEdu() {
    if (this.isOptional) {
      this.clearValidator();
    }
  }

  clearValidator() {
    this.form.controls.degreeName.clearValidators();
    this.form.controls.major.clearValidators();
    this.form.controls.institution.clearValidators();
  }
}
