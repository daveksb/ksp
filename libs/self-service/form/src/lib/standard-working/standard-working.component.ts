import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DynamicComponentDirective } from '@ksp/shared/directive';
import { KspFormBaseComponent, ListData } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { skip } from 'rxjs';

@Component({
  selector: 'self-service-standard-working',
  templateUrl: './standard-working.component.html',
  styleUrls: ['./standard-working.component.scss'],
  providers: providerFactory(StandardWorkingComponent),
})
export class StandardWorkingComponent
  extends KspFormBaseComponent
  implements OnInit
{
  selectedEducationType!: number;
  workingInfo = ['1.รางวัลอื่นและประกาศเกียรติคุณ'];

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
      })
    );
  }

  ngOnInit(): void {
    this.educationTypes = educationTypes;

    this.form.controls['educationType'].valueChanges.subscribe((res) => {
      this.selectedEducationType = Number(res);
      //this.form.controls.educationLevelForm.reset();
    });
  }
}

const educationTypes = [
  {
    value: 0,
    label: `ผู้ประกอบวิชาชีพครู`,
  },
  {
    value: 1,
    label: `ผู้มิได้ประกอบวิชาชีพครู`,
  },
];
