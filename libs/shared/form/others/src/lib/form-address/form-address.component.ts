import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-form-address',
  templateUrl: './form-address.component.html',
  styleUrls: ['./form-address.component.scss'],
  providers: providerFactory(FormAddressComponent),
})
export class FormAddressComponent extends KspFormBaseComponent {
  @Input() isDarkMode = false;
  @Input() provinces: any[] = [];
  @Input() amphurs: any[] = [];
  @Input() tumbols: any[] = [];
  @Output() provinceChanged = new EventEmitter<any>();
  @Output() amphurChanged = new EventEmitter<any>();

  /**
   * Dark Mode : all inputs will have gray background and form container will have white background
   * Use in Self-Service
   * Normal Mode : all inputs will have white background and form container will have gray background
   * Use in E-service, School-Service
   */

  override form = this.fb.group({
    id: [null],
    addressType: [null],
    location: [''],
    houseNo: [null, Validators.required],
    moo: [''],
    alley: [''],
    road: [''],
    postcode: [null, Validators.required],
    province: [null, Validators.required],
    amphur: [null, Validators.required],
    tumbol: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  // change postcode corespond to Tumbol changed
  updatePostcode(evt: any) {
    const tumbolCode = evt.target?.value;
    const postCode = this.tumbols.find((t) => t.tambolCode === tumbolCode);
    this.form.controls.postcode.patchValue(postCode.tambolPostcode);
  }
}
