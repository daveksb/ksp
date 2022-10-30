import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { skip } from 'rxjs';
import moment from 'moment';

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

  status = statusList;
  hiringYears = 0;
  hiringMonths = 0;

  override form = this.fb.group({
    psersonType: [null, Validators.required],
    position: [null, Validators.required],
    academicStanding: [null, Validators.required],
    hiringContractNo: [],
    startDate: [null, Validators.required],
    endDate: [null, Validators.required],

    hiringStatus: [], //radio
    hiringStartDate: [],
    hiringEndDate: [],
    hiringCancelDate: [],
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

    this.form.controls.hiringStatus.valueChanges.pipe(skip(3)).subscribe(() => {
      this.form.controls.hiringStartDate.reset();
      this.form.controls.hiringEndDate.reset();
      this.form.controls.hiringCancelDate.reset();
    });

    this.startDate.valueChanges.subscribe(() => {
      this.calculateHiringPeriod();
    });

    this.endDate.valueChanges.subscribe(() => {
      this.calculateHiringPeriod();
    });
  }

  calculateHiringPeriod() {
    const eDate = moment(this.endDate.value);
    const sDate = moment(this.startDate.value);

    this.hiringYears = eDate.diff(sDate, 'years');
    sDate.add(this.hiringYears, 'years');
    this.hiringMonths = eDate.diff(sDate, 'months');
  }

  get startDate() {
    return this.form.controls.startDate;
  }

  get endDate() {
    return this.form.controls.endDate;
  }
}

export const statusList = [
  { label: 'แจ้งเข้า', value: '1', formDataName: 'hiringStartDate' },
  { label: 'แจ้งออก', value: '2', formDataName: 'hiringEndDate' },
  { label: 'ยกเลิกข้อมูล', value: '3', formDataName: 'hiringCancelDate' },
];
