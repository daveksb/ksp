import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForeignStepTwoTabOneComponent } from '../foreign-step-two-tab-one/foreign-step-two-tab-one.component';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'self-service-foreign-step-two-tab-two',
  standalone: true,
  imports: [CommonModule, ForeignStepTwoTabOneComponent, ReactiveFormsModule],
  templateUrl: './foreign-step-two-tab-two.component.html',
  styleUrls: ['./foreign-step-two-tab-two.component.scss'],
  providers: providerFactory(ForeignStepTwoTabTwoComponent),
})
export class ForeignStepTwoTabTwoComponent extends KspFormBaseComponent {
  @Input() provinces: any[] = [];
  @Input() districts: any[] = [];
  @Input() subDistricts: any[] = [];
  @Output() provinceChanged = new EventEmitter<any>();
  @Output() districtChanged = new EventEmitter<any>();

  override form = this.fb.group({
    addressForm: [''],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value: any) => {
        this.onChange({ ...value.addressForm });
        this.onTouched();
      })
    );
  }
}
