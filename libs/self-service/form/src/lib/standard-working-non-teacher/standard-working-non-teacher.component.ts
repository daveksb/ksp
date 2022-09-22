import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SchoolServiceFormActivityModule } from '@ksp/school-service/form/activity';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'self-service-standard-working-non-teacher',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SchoolServiceFormActivityModule],
  templateUrl: './standard-working-non-teacher.component.html',
  styleUrls: ['./standard-working-non-teacher.component.scss'],
  providers: providerFactory(StandardWorkingNonTeacherComponent),
})
export class StandardWorkingNonTeacherComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    activity13: [],
    activity14: [],
    activity15: [],
    trainInfo: [],
    testInfo: [],
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
      //console.log('exp form = ', res);
    });
  }

  get activity1() {
    return this.form.controls.activity13.value;
  }

  get activity2() {
    return this.form.controls.activity14.value;
  }

  get activity3() {
    return this.form.controls.activity15.value;
  }
}
