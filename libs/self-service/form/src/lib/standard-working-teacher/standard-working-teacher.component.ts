import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SchoolServiceFormActivityModule } from '@ksp/school-service/form/activity';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'self-service-standard-working-teacher',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SchoolServiceFormActivityModule],
  templateUrl: './standard-working-teacher.component.html',
  styleUrls: ['./standard-working-teacher.component.scss'],
  providers: providerFactory(StandardWorkingTeacherComponent),
})
export class StandardWorkingTeacherComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    activity1: [],
    activity2: [],
    activity3: [],
    activity4: [],
    activity5: [],
    activity6: [],
    activity7: [],
    activity8: [],
    activity9: [],
    activity10: [],
    activity11: [],
    activity12: [],
    activity1Form: [],
    activity2Form: [],
    activity3Form: [],
    activity4Form: [],
    activity5Form: [],
    activity6Form: [],
    activity7Form: [],
    activity8Form: [],
    activity9Form: [],
    activity10Form: [],
    activity11Form: [],
    activity12Form: [],
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
    return this.form.controls.activity1.value;
  }

  get activity2() {
    return this.form.controls.activity2.value;
  }

  get activity3() {
    return this.form.controls.activity3.value;
  }

  get activity4() {
    return this.form.controls.activity4.value;
  }

  get activity5() {
    return this.form.controls.activity5.value;
  }

  get activity6() {
    return this.form.controls.activity6.value;
  }

  get activity7() {
    return this.form.controls.activity7.value;
  }

  get activity8() {
    return this.form.controls.activity8.value;
  }

  get activity9() {
    return this.form.controls.activity9.value;
  }

  get activity10() {
    return this.form.controls.activity10.value;
  }

  get activity11() {
    return this.form.controls.activity11.value;
  }

  get activity12() {
    return this.form.controls.activity12.value;
  }
}
