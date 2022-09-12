import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-form-hiring-info',
  templateUrl: './form-hiring-info.component.html',
  styleUrls: ['./form-hiring-info.component.scss'],
  providers: providerFactory(FormHiringInfoComponent),
})
export class FormHiringInfoComponent extends KspFormBaseComponent {
  @Input() displayMode: 'staff' | 'request' = 'staff';
  @Input() positionTypes: any = [];
  @Input() staffTypes: any = [];
  @Input() academicStandingList: any = [];

  status = status;
  override form = this.fb.group({
    psersonType: [null, Validators.required],
    position: [null, Validators.required],
    academicStanding: [null, Validators.required],
    hiringContractNo: [],
    startDate: [null, Validators.required],
    endDate: [null, Validators.required],
    hiringPeriodYear: [],
    hiringPeriodMonth: [],

    hiringStatus: [], //radio
    hiringStatusDate: [],
    hiringStatusReason: [],
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
}

export const status = [
  { label: 'แจ้งเข้า', value: '1' },
  { label: 'แจ้งออก', value: '2' },
  { label: 'ยกเลิกข้อมูล', value: '3' },
];
