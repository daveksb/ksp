import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  KspFormBaseComponent,
  SchRequestProcess,
  SchRequestStatus,
} from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { selfOccupyList, SelfRequestProcess } from '@ksp/shared/constant';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'ksp-e-service-license-save-result',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDatepickerModule],
  templateUrl: './e-service-license-save-result.component.html',
  styleUrls: ['./e-service-license-save-result.component.scss'],
  providers: providerFactory(EServiceLicenseSaveResultComponent),
})
export class EServiceLicenseSaveResultComponent extends KspFormBaseComponent {
  @Output() cancel = new EventEmitter<boolean>(false);
  @Output() save = new EventEmitter<any>();

  eduOccupyList = selfOccupyList;
  processList: SchRequestProcess[] = [];
  statusList?: SchRequestStatus[] = [];

  override form = this.fb.group({
    no: [null],
    date: [null],
    boardname: [null],
    presidentname: [null],
    result: [null],
    detail: [null],
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
