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
  @Input() selectDegreeLevel = 1;
  @Input() showGradeInput = false;
  @Input() showPropertyInput = false;
  @Input() showSelectDegree = false;
  @Input() showGraduateYearInput = false;
  @Input() countries: any[] = [];
  @Input() showCheckbox = true;
  @Input() option = false;
  @Input() userEducationType: any;
  FormTypeEnum = UserInfoFormType;

  override form = this.fb.group({
    degreeLevel: [this.selectDegreeLevel],
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
    /* if (this.defualtDegree) {
      setTimeout(() => {
        this.degreeLevel.setValue(this.defualtDegree);
        this.degreeLevel.disable();
      }, 0);
    } */
    if (this.option) {
      this.form.clearValidators();
    }
    this.form.valueChanges.subscribe((res) => {
      //console.log('res = ', res);
    });
  }

  get degreeLevel() {
    return this.form.controls.degreeLevel;
  }
}
