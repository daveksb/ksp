import { Component, EventEmitter, Output } from '@angular/core';
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
  selector: 'ksp-e-service-license-group-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDatepickerModule],
  templateUrl: './e-service-license-group-search.component.html',
  styleUrls: ['./e-service-license-group-search.component.scss'],
  providers: providerFactory(EServiceLicenseGroupSearchComponent),
})
export class EServiceLicenseGroupSearchComponent extends KspFormBaseComponent {
  @Output() clear = new EventEmitter<boolean>(false);
  @Output() search = new EventEmitter<any>();

  processList: SchRequestProcess[] = [];
  statusList?: SchRequestStatus[] = [];
  licenseTypes = selfOccupyList.filter((i) => i.id < 5);

  override form = this.fb.group({
    groupno: [null],
    createdate: [null],
    careertype: [null],
    isforeign: [null],
    process: [null],
    status: [null],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );

    this.processList = SelfRequestProcess.filter((i) => {
      return `${i.requestType}` === '1' && i.processId > 4;
    });

    this.form.controls.process.valueChanges.subscribe((currentProcess) => {
      this.statusList = this.processList.find(
        (p) => `${p.processId}` === currentProcess
      )?.status;
      //console.log('status list = ', this.statusList);
    });
  }
}
