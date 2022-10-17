import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  Amphur,
  KspFormBaseComponent,
  Province,
  Tambol,
} from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

/**
 * Dark Mode : all inputs will have gray background and form container will have white background
 * Use in Self-Service
 * Normal Mode : all inputs will have white background and form container will have gray background
 * Use in E-service, School-Service
 */
@Component({
  selector: 'ksp-form-address',
  templateUrl: './form-address.component.html',
  styleUrls: ['./form-address.component.scss'],
  providers: providerFactory(FormAddressComponent),
})
export class FormAddressComponent extends KspFormBaseComponent {
  @Input() isDarkMode = false;
  @Input() provinces: Province[] | null = [];
  @Input() amphurs: Amphur[] | null = [];
  @Input() tumbols: Tambol[] | null = [];
  @Output() provinceChanged = new EventEmitter<any>();
  @Output() amphurChanged = new EventEmitter<any>();

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
    if (this.tumbols) {
      const postCode = this.tumbols.find((t) => t.tambolCode === tumbolCode);
      if (postCode && postCode.tambolPostcode) {
        this.form.controls.postcode.patchValue(<any>postCode.tambolPostcode);
      }
    }
  }
}
