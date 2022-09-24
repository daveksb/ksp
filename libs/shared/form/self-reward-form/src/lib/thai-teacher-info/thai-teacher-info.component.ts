import { Component, OnInit } from '@angular/core';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'ksp-thai-teacher-info',
  templateUrl: './thai-teacher-info.component.html',
  styleUrls: ['./thai-teacher-info.component.scss'],
  providers: providerFactory(ThaiTeacherInfoComponent),
})
export class ThaiTeacherInfoComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    startDate: [],
    position: [''],
    experienceYear: [''],
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
}
