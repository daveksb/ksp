import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DynamicComponentDirective } from '@ksp/shared/directive';
import {
  EducationLevelFormFourComponent,
  EducationLevelFormOneComponent,
  EducationLevelFormThreeComponent,
  EducationLevelFormTwoComponent,
} from '@ksp/shared/form/education-level';
import {
  DynamicComponent,
  KspFormBaseComponent,
  ListData,
} from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

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
  override form = this.fb.group({
    educationType: [''],
    educationLevelForm: this.fb.group({}),
  });

  educationTypes: ListData[] = [];
  @ViewChild(DynamicComponentDirective, { static: true })
  myHost!: DynamicComponentDirective;

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
    this.educationTypes = educationTypes;

    this.form.controls['educationType'].valueChanges.subscribe((res) => {
      this.loadComponent(Number(res));
    });
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
