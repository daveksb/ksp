import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-form-hiring-info',
  templateUrl: './form-hiring-info.component.html',
  styleUrls: ['./form-hiring-info.component.scss'],
  providers: providerFactory(FormHiringInfoComponent),
})
export class FormHiringInfoComponent
  extends KspFormBaseComponent
  implements OnInit
{
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
  ngOnInit(): void {
    if (this.displayMode === 'request') {
      this.form.controls.psersonType.clearValidators();
      this.form.controls.academicStanding.clearValidators();
    }
  }
}

export const status = [
  { label: 'แจ้งเข้า', value: '1' },
  { label: 'แจ้งออก', value: '2' },
  { label: 'ยกเลิกข้อมูล', value: '3' },
];
