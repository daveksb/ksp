import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DynamicComponentDirective } from '@ksp/shared/directive';
import {
  EducationLevelFormFourComponent,
  EducationLevelFormOneComponent,
  EducationLevelFormThreeComponent,
  EducationLevelFormTwoComponent,
} from '@ksp/shared/form/education-level';
import { DynamicComponent, ListData } from '@ksp/shared/interface';

@Component({
  selector: 'self-service-form-user-education',
  templateUrl: './form-user-education.component.html',
  styleUrls: ['./form-user-education.component.css'],
})
export class FormUserEducationComponent implements OnInit {
  educationForm = this.fb.group({
    educationType: [''],
  });

  educationTypes: ListData[] = [];
  @ViewChild(DynamicComponentDirective, { static: true })
  myHost!: DynamicComponentDirective;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.educationTypes = educationTypes;

    this.educationForm.controls['educationType'].valueChanges.subscribe(
      (res) => {
        this.loadComponent(Number(res));
      }
    );
  }

  loadComponent(index: number) {
    const viewContainerRef = this.myHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent<DynamicComponent>(componentList[index]);
  }
}

const componentList = [
  EducationLevelFormOneComponent,
  EducationLevelFormTwoComponent,
  EducationLevelFormOneComponent,
  EducationLevelFormOneComponent,
  EducationLevelFormThreeComponent,
  EducationLevelFormFourComponent,
];

const educationTypes = [
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
