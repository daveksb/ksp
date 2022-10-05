import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'self-service-foreign-step-two-tab-one',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './foreign-step-two-tab-one.component.html',
  styleUrls: ['./foreign-step-two-tab-one.component.scss'],
  providers: providerFactory(ForeignStepTwoTabOneComponent),
})
export class ForeignStepTwoTabOneComponent extends KspFormBaseComponent {
  @Input() provinces: any[] = [];
  @Input() districts: any[] = [];
  @Input() subDistricts: any[] = [];
  @Output() provinceChanged = new EventEmitter<any>();
  @Output() districtChanged = new EventEmitter<any>();

  override form = this.fb.group({
    houseNo: [''],
    alley: [''],
    road: [''],
    postcode: [''],
    province: [''],
    tumbol: [''],
    amphur: [''],
    phone: [''],
    email: [''],
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
    const postCode = this.subDistricts.find((t) => t.tambolCode === tumbolCode);
    this.form.controls.postcode.patchValue(postCode.tambolPostcode);
  }
}
