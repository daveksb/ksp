import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import {
  RequestProcess,
  RequestStatus,
  selfOccupyList,
} from '@ksp/shared/constant';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'ksp-e-service-license-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDatepickerModule],
  templateUrl: './e-service-license-search.component.html',
  styleUrls: ['./e-service-license-search.component.scss'],
  providers: providerFactory(EServiceLicenseSearchComponent),
})
export class EServiceLicenseSearchComponent extends KspFormBaseComponent {
  @Output() clear = new EventEmitter<boolean>(false);
  @Output() search = new EventEmitter<any>();

  eduOccupyList = selfOccupyList;
  processList: RequestProcess[] = [];
  statusList?: RequestStatus[] = [];

  override form = this.fb.group({
    requestno: [null],
    subtype: [null],
    idcardno: [''],
    currentprocess: [null],
    requeststatus: [null],
    requestdatefrom: [null],
    requestdateto: [null],
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
