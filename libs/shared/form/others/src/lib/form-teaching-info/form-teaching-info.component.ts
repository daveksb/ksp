import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';

@Component({
  selector: 'ksp-form-teaching-info',
  templateUrl: './form-teaching-info.component.html',
  styleUrls: ['./form-teaching-info.component.scss'],
})
export class FormTeachingInfoComponent
  extends KspFormBaseComponent
  implements OnInit
{
  level = {
    ['ปฐมวัย']: false,
    ['ช่วงชั้นที่ 1 (ประถมศึกษาปีที่ 1-3)']: false,
    ['ช่วงชั้นที่ 2 (ประถมศึกษาปีที่ 4-6)']: false,
    ['ช่วงชั้นที่ 3 (มัธยมศึกษาปีที่ 1-3) ']: false,
    ['ช่วงชั้นที่ 4 (มัธยมศึกษาปีที่ 4-6)']: false,
    ['ประกาศนียบัตรวิชาชีพ (ปวช.)']: false,
    ['ประกาศนียบัตรวิชาชีพขั้นสูง (ปวส.)']: false,
    ['อื่นๆ']: false,
  };

  levelFormGroup = this.fb.group(this.level);

  override form = this.fb.group({
    subjectAssign: [],
    test: this.levelFormGroup,
    contractNumber: [],
    post: [],
    workStartDate: [],
    workEndDate: [],
    hireDurationYear: [],
    hireDurationMonth: [],
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
      console.log('res = ', res);
    });
  }
}
