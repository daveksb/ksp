import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'self-service-form-user-experience',
  templateUrl: './form-user-experience.component.html',
  styleUrls: ['./form-user-experience.component.css'],
  providers: providerFactory(FormUserExperienceComponent),
})
export class FormUserExperienceComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    TrainingAddressOne: [],
    TrainingAddressTwo: [],
    teachingAddress: [],
    selectValue: [''],
    foreignLicenseForm: this.fb.group({}),
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
    this.form.controls['selectValue'].valueChanges.subscribe((res) => {
      //console.log('res', res);
    });
  }
}
