import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicComponentDirective } from '@ksp/shared/directive';
import {
  CourseFormFourComponent,
  CourseFormOneComponent,
  CourseFormThreeComponent,
  CourseFormTwoComponent,
} from '@ksp/shared/form/uni-course-form';
import { DynamicComponent, ListData } from '@ksp/shared/interface';

@Component({
  selector: 'ksp-degree-cert-step-one',
  templateUrl: './degree-cert-step-one.component.html',
  styleUrls: ['./degree-cert-step-one.component.css'],
})
export class DegreeCertStepOneComponent implements OnInit {
  courseTypes: ListData[] = [];
  @Input() isViewForm = false;
  @ViewChild(DynamicComponentDirective, { static: true })
  myHost!: DynamicComponentDirective;

  step1Form = this.fb.group({
    courseType: [''],
  });

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.courseTypes = courseTypes;

    this.step1Form.controls['courseType'].valueChanges.subscribe((res) => {
      this.loadComponent(Number(res));
    });
  }

  goToStep2() {
    this.router.navigate(['/', 'degree-cert', 'step-2']);
  }

  loadComponent(index: number) {
    const viewContainerRef = this.myHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent<DynamicComponent>(componentList[index]);
  }
}

const courseTypes: ListData[] = [
  {
    value: 0,
    label: 'ปริญญาตรีทางการศึกษา (หลักสูตร 5 ปี)',
  },
  {
    value: 1,
    label: 'เอกเดี่ยว กรณีไม่มีการกำหนดวิชาเอก หรือแขนงวิชาย่อย',
  },
  {
    value: 2,
    label: 'เอกเดี่ยว กรณีมีการกำหนดวิชาเอก หรือแขนงวิชาย่อย',
  },
  {
    value: 3,
    label: 'เอกคู่',
  },
  {
    value: 4,
    label: 'เอก-โท',
  },
];

const componentList = [
  CourseFormOneComponent,
  CourseFormTwoComponent,
  CourseFormThreeComponent,
  CourseFormFourComponent,
  CourseFormOneComponent,
];
