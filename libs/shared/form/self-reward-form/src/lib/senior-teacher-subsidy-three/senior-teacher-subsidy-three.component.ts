import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-senior-teacher-subsidy-three',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './senior-teacher-subsidy-three.component.html',
  styleUrls: ['./senior-teacher-subsidy-three.component.scss'],
  providers: providerFactory(SeniorTeacherSubsidyThreeComponent),
})
export class SeniorTeacherSubsidyThreeComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    childrenCount: [],
    study: [],
    studyCount: [],
    graduate: [],
    graduateCount: [],
    disabled: [],
    disabledCount: [],
    congenitalDisease: [],
    congenitalDiseaseCount: [],
    working: [],
    workingCount: [],
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

  ngOnInit(): void {}
}
