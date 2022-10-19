import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Amphur,
  KspFormBaseComponent,
  Province,
  Tambol,
} from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'self-service-foreign-step-two-tab-one',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './foreign-step-two-tab-one.component.html',
  styleUrls: ['./foreign-step-two-tab-one.component.scss'],
  providers: providerFactory(ForeignStepTwoTabOneComponent),
})
export class ForeignStepTwoTabOneComponent extends KspFormBaseComponent {
  @Input() provinces: Province[] | null = [];
  @Input() districts: Amphur[] | null = [];
  @Input() subDistricts: Tambol[] | null = [];
  @Output() provinceChanged = new EventEmitter<any>();
  @Output() districtChanged = new EventEmitter<any>();

  override form = this.fb.group({
    houseNo: ['', Validators.required],
    alley: [''],
    road: [''],
    postcode: ['', Validators.required],
    province: ['', Validators.required],
    tumbol: ['', Validators.required],
    amphur: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
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

  updatePostcode(evt: any) {
    const tumbolCode = evt.target?.value;
    if (this.subDistricts) {
      const postCode = this.subDistricts.find(
        (t) => t.tambolCode === tumbolCode
      );
      if (postCode)
        this.form.controls.postcode.patchValue(postCode.tambolPostcode);
    }
  }
}
