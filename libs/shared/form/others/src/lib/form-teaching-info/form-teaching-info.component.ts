import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ksp-form-teaching-info',
  templateUrl: './form-teaching-info.component.html',
  styleUrls: ['./form-teaching-info.component.scss'],
})
export class FormTeachingInfoComponent implements OnInit {
  levelFormGroup: FormGroup;

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

  constructor(private fb: FormBuilder) {
    this.levelFormGroup = this.fb.group(this.level);
  }

  ngOnInit(): void {
    this.levelFormGroup.valueChanges.subscribe((res) => {
      console.log('res = ', res);
    });
  }
}
