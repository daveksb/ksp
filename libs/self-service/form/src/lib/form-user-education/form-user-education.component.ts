import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { DynamicComponentDirective } from '@ksp/shared/directive';
import { KspFormBaseComponent, ListData } from '@ksp/shared/interface';
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
  selectedEducationType!: number;

  override form = this.fb.group({
    educationType: [],
    educationLevelForm: [],
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
        //this.form.reset();
        //this.form.reset(undefined, { onlySelf: true, emitEvent: false });
        //this.form.setControl('educationLevelForm', new FormControl());
      })
    );
  }

  ngOnInit(): void {
    this.educationTypes = educationTypes;

    this.form.controls['educationType'].valueChanges
      .pipe(skip(1))
      .subscribe((res) => {
        //this.loadComponent(Number(res));
        //this.form.setControl('educationLevelForm', new FormControl());
        this.selectedEducationType = Number(res);
      });
  }
}

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
