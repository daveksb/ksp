import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  override form = this.fb.group({
    id: [],
    degreeLevel: [null, Validators.required],
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

  @Input() showGradeInput = false;
  @Input() showPropertyInput = false;
  @Input() showSelectDegree = false;
  @Input() showGraduateYearInput = false;
  @Input() countries: any[] = [];
  @Input() showCheckbox = true;

  /*   _defualtDegree = 0;
  @Input()
  set defualtDegree(value: any) {
    this._defualtDegree = value;
  }
  get defualtDegree(): any {
    return this._defualtDegree;
  } */

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
    /* if (this.defualtDegree) {
      setTimeout(() => {
        this.degreeLevel.setValue(this.defualtDegree);
        this.degreeLevel.disable();
      }, 0);
    } */
    this.form.valueChanges.subscribe((res) => {
      //console.log('res = ', res);
    });
  }

  get degreeLevel() {
    return this.form.controls.degreeLevel;
  }
}
