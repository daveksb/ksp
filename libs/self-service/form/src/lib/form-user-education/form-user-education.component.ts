import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Country, KspFormBaseComponent, ListData } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { skip } from 'rxjs';

@Component({
  selector: 'self-service-form-user-education',
  templateUrl: './form-user-education.component.html',
  styleUrls: ['./form-user-education.component.css'],
  providers: providerFactory(FormUserEducationComponent),
})
export class FormUserEducationComponent
  extends KspFormBaseComponent
  implements OnInit
{
  @Input() educationTypes:
    | 'teacher'
    | 'schManager'
    | 'eduManager'
    | 'supervision' = 'teacher';

  @Input() countries: Country[] | null = [];
  @Input() attachFiles!: any[];
  @Input() uniqueTimestamp = '';
  @Input() title = '';
  @Input() systemType = '';

  selectedEducationType!: number;

  override form = this.fb.group({
    educationType: [null, Validators.required],
    educationLevelForm: [null, Validators.required],
  });

  educationTypes1: ListData[] = [];
  educationTypes2: ListData[] = [];
  educationTypes3: ListData[] = [];

  /* @ViewChild(DynamicComponentDirective, { static: true })
  myHost!: DynamicComponentDirective; */

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
      .pipe(skip(this.educationTypes === 'teacher' ? 3 : 1))
      .subscribe((res) => {
        this.selectedEducationType = Number(res);
        //this.form.controls.educationLevelForm.reset();
      });
  }
}

const educationTypes1 = [
  {
    value: 0,
    label: `วุฒิปริญญาทางการศึกษา หรือเทียบเท่า หรือคุณวุฒิอื่นที่คุรุสภาให้การรับรอง`,
  },
  {
    value: 1,
    label: `วุฒิประกาศนียบัตรบัณฑิตวิชาชีพครูที่คุรุสภาให้การรับรอง`,
  },
  {
    value: 2,
    label: `วุฒิไม่ต่ำกว่าปริญญาตรี`,
  },
  {
    value: 3,
    label: `วุฒิปริญญาทางการศึกษาหลักสูตร 4 ปี`,
  },
  {
    value: 4,
    label: `รับรองคุณวุฒิการศึกษา`,
  },
  {
    value: 5,
    label: `วุฒิปริญญาทางการศึกษาจากต่างประเทศ`,
  },
];

const educationTypes2 = [
  {
    value: 0,
    label: `วุฒิปริญญาทางการบริหารการศึกษา`,
  },
  {
    value: 1,
    label: `ประกาศนียบัตรบัณฑิต สาขาวิชาการบริหารการศึกษาที่คุรุสภาให้การรับรอง`,
  },
  {
    value: 2,
    label: `วุฒิไม่ต่ำกว่าปริญญาตรี`,
  },
  {
    value: 3,
    label: `รับรองคุณวุฒิการศึกษา`,
  },
];

const educationTypes3 = [
  {
    value: 0,
    label: `วุฒิปริญญาโทหรือปริญญาเอกทางการศึกษา`,
  },
  {
    value: 1,
    label: `รับรองคุณวุฒิการศึกษา`,
  },
];
