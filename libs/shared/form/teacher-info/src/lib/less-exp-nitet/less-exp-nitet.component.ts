import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-less-exp-nitet',
  templateUrl: './less-exp-nitet.component.html',
  styleUrls: ['./less-exp-nitet.component.scss'],
  providers: providerFactory(LessExpNitetComponent),
})
export class LessExpNitetComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    prefix: [],
    firstname: [],
    lastname: [],
    academicPost: [],
    educationDegree: [],
    branch: [],
    nitetExperience: [],
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
