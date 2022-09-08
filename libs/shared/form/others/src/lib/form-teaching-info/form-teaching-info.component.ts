import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
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
  subjects = subjects;

  override form = this.fb.group({
    teachingLevel: this.fb.array([]),
    teachingSubjects: this.fb.array([]),
    teachingSubjectOther: [],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.addCheckboxes();
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

  private addCheckboxes() {
    this.levels.forEach(() =>
      this.teachingLevelFormArray.push(new FormControl(false))
    );

    this.subjects.forEach(() =>
      this.teachingSubjectsFormArray.push(new FormControl(false))
    );
  }
  get teachingSubjectsFormArray() {
    return this.form.controls.teachingSubjects as FormArray;
  }

  get teachingLevelFormArray() {
    return this.form.controls.teachingLevel as FormArray;
  }
}

export const levels = [
  { label: 'ประกาศนียบัตรวิชาชีพ (ปวช.)', value: 'level6' },
  { label: 'ชั้นมัธยมปีที่ 1-3', value: 'level4' },
  { label: 'ชั้นประถมปีที่ 1-3', value: 'level2' },
  { label: 'อนุบาล', value: 'level1' },
  {
    label: 'ประกาศนียบัตรวิชาชีพขั้นสูง (ปวส.) / อนุปริญญา',
    value: 'level7',
  },
  { label: 'ชั้นมัธยมปีที่ 4-6', value: 'level5' },
  { label: 'ชั้นประถมปีที่ 4-6', value: 'level3' },
];

export const subjects = [
  { label: 'ภาษาไทย', value: 's1' },
  { label: 'วิทยาศาสตร์', value: 's6' },
  { label: 'คณิตศาสตร์', value: 's12' },
  { label: 'ภาษาต่างประเทศ', value: 's2' },
  { label: 'ปฐมวัย', value: 's7' },
  { label: 'เทคโนโลยีสารสนเทศและการสื่อสาร', value: 's13' },
  { label: 'สุขศึกษาและพละศึกษา', value: 's3' },
  { label: 'คหกรรม', value: 's8' },
  { label: 'พาณิชยกรรม/บริหารธุรกิจ', value: 's14' },
  { label: 'สังคมศึกษา ศาสนาและวัฒนธรรม', value: 's4' },
  { label: 'ศิลปกรรม', value: 's9' },
  { label: 'อุตสาหกรรม', value: 's15' },
  { label: 'การงานอาชีพและเทคโนโลยี', value: 's5' },
  { label: 'เกษตรกรรม', value: 's10' },
  { label: 'อุตสาหกรรมสิ่งทอ', value: 's16' },
  { label: 'อื่นๆ', value: 's18' },
  { label: 'ประมง', value: 's11' },
  { label: 'อุตสาหกรรมท่องเที่ยว', value: 's17' },
];
