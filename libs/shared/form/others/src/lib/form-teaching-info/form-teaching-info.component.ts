import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-form-teaching-info',
  templateUrl: './form-teaching-info.component.html',
  styleUrls: ['./form-teaching-info.component.scss'],
  providers: providerFactory(FormTeachingInfoComponent),
})
export class FormTeachingInfoComponent
  extends KspFormBaseComponent
  implements OnInit
{
  levels = levels;

  override form = this.fb.group({
    subjectAssign: [],
    level1: [false],
    level2: [false],
    level3: [false],
    level4: [false],
    level5: [false],
    level6: [false],
    level7: [false],
    level8: [false],
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
      //();
    });
  }
}

export const levels = [
  { label: 'ปฐมวัย', name: 'level1', value: false },
  {
    label: 'ช่วงชั้นที่ 1 (ประถมศึกษาปีที่ 1-3)',
    name: 'level2',
    value: false,
  },
  {
    label: 'ช่วงชั้นที่ 2 (ประถมศึกษาปีที่ 4-6)',
    name: 'level3',
    value: true,
  },
  {
    label: 'ช่วงชั้นที่ 3 (มัธยมศึกษาปีที่ 1-3)',
    name: 'level4',
    value: false,
  },
  {
    label: 'ช่วงชั้นที่ 4 (มัธยมศึกษาปีที่ 4-6)',
    name: 'level5',
    value: false,
  },
  {
    label: 'ประกาศนียบัตรวิชาชีพ (ปวช.)',
    name: 'level6',
    value: false,
  },
  {
    label: 'ประกาศนียบัตรวิชาชีพขั้นสูง (ปวส.)',
    name: 'level7',
    value: false,
  },
  {
    label: 'อื่นๆ',
    name: 'level8',
    value: false,
  },
];
