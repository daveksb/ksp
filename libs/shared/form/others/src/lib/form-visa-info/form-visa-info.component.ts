import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import {
  createDefaultVisaInfo,
  providerFactory,
  validatorMessages,
} from '@ksp/shared/utility';

@Component({
  selector: 'ksp-form-visa-info',
  templateUrl: './form-visa-info.component.html',
  styleUrls: ['./form-visa-info.component.scss'],
  providers: providerFactory(FormVisaInfoComponent),
})
export class FormVisaInfoComponent extends KspFormBaseComponent {
  @Input() isDarkMode = false;
  @Input() visaTypeList: any;

  validatorMessages = validatorMessages;

  /**
   * Dark Mode : all inputs will have gray background and form container will have white background
   * Use in Self-Service
   *
   * Normal Mode : all inputs will have white background and form container will have gray background
   * Use in E-service, School-Service
   */

  override form = createDefaultVisaInfo(this.fb);

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.subscribe((value: any) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }


}
