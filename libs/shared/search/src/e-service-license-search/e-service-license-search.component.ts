import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  KspFormBaseComponent,
  Province,
  SchRequestProcess,
  SchRequestStatus,
} from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { selfOccupyList, SelfRequestProcess } from '@ksp/shared/constant';
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
  @Input() provinces: Province[] | null = [];

  eduOccupyList = selfOccupyList;
  processList: SchRequestProcess[] = [];
  statusList?: SchRequestStatus[] = [];

  override form = this.fb.group({
    requestno: [null],
    careertype: [null],
    idcardno: [''],
    province: [null],
    process: [null],
    status: [null],
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

    this.processList = SelfRequestProcess.filter((i) => {
      return `${i.requestType}` === '1' && i.processId > 1;
    });

    this.form.controls.process.valueChanges.subscribe(
      (currentProcess) => {
        this.statusList = this.processList.find(
          (p) => `${p.processId}` === currentProcess
        )?.status;
        //console.log('status list = ', this.statusList);
      }
    );
  }
}
