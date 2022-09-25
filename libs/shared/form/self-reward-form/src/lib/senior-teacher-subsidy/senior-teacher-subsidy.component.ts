import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-senior-teacher-subsidy',
  templateUrl: './senior-teacher-subsidy.component.html',
  styleUrls: ['./senior-teacher-subsidy.component.scss'],
  providers: providerFactory(SeniorTeacherSubsidyComponent),
})
export class SeniorTeacherSubsidyComponent
  extends KspFormBaseComponent
  implements OnInit
{
  typesOfSubject: string[] = [
    'สถานภาพ',
    'คู่สมรส',
    'บุตร',
    'ค่าใช้จ่าย',
    'รายได้ก่อนเกษียณ',
    'ทรัพย์สินของตนเองและคู่สมรส',
  ];

  override form = this.fb.group({
    hasSubsidy: [],
    status: [],
    spouse: [],
    children: [],
    expense: [],
    income: [],
    property: [],
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
    this.form.valueChanges.subscribe((res) => {
      //console.log('exp form = ', res);
    });
  }

  get hasSubsidy() {
    return this.form.controls.hasSubsidy.value;
  }
}
