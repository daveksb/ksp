import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { formAddressModel, KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-form-address',
  templateUrl: './form-address.component.html',
  styleUrls: ['./form-address.component.scss'],
  providers: providerFactory(FormAddressComponent),
})
export class FormAddressComponent extends KspFormBaseComponent {
  @Input() isDarkMode = false;

  /**
   * Dark Mode : all inputs will have gray background and form container will have white background
   * Use in Self-Service
   *
   * Normal Mode : all inputs will have white background and form container will have gray background
   * Use in E-service, School-Service
   */

  override form = this.fb.group(formAddressModel);

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
