import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  KspFormBaseComponent,
  SchRequestProcess,
  SchRequestStatus,
} from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { selfOccupyList } from '@ksp/shared/constant';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'ksp-e-service-reward-account-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDatepickerModule],
  templateUrl: './e-service-reward-account-search.component.html',
  styleUrls: ['./e-service-reward-account-search.component.scss'],
  providers: providerFactory(EServiceRewardAccountSearchComponent),
})
export class EServiceRewardAccountSearchComponent extends KspFormBaseComponent {
  @Output() clear = new EventEmitter<boolean>(false);
  @Output() search = new EventEmitter<any>();

  processList: SchRequestProcess[] = [];
  statusList?: SchRequestStatus[] = [];
  licenseTypes = selfOccupyList.filter((i) => i.id < 5);

  override form = this.fb.group({
    groupno: [null],
    careertype: [null],
    result: [null],
    createFrom: [null],
    createTo: [null],
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
