import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  KspFormBaseComponent,
  VisaClass,
  VisaType,
} from '@ksp/shared/interface';
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
  @Input() visaTypeList: VisaType[] | null = [];
  @Input() visaClassList: VisaClass[] | null = [];

  validatorMessages = validatorMessages;

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
