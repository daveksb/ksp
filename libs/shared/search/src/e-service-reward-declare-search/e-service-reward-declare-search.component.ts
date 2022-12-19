import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  KspFormBaseComponent,
  SchRequestProcess,
  SchRequestStatus,
} from '@ksp/shared/interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelfRequestProcess, SelfRequestType } from '@ksp/shared/constant';

@UntilDestroy()
@Component({
  selector: 'ksp-e-service-reward-declare-search',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, ReactiveFormsModule],
  templateUrl: './e-service-reward-declare-search.component.html',
  styleUrls: ['./e-service-reward-declare-search.component.scss'],
})
export class EServiceRewardDeclareSearchComponent
  extends KspFormBaseComponent
  implements OnInit
{
  @Output() clear = new EventEmitter<boolean>();
  @Output() search = new EventEmitter<any>();

  override form = this.fb.group({
    // requesttype: ['', Validators.required],
    requestno: [''],
    idcardno: [''],
    name: [''],
    status: [''],
    requestdatefrom: [''],
    requestdateto: [''],
    declaredatefrom: [''],
    declaredateto: [''],

    careertype: [],
    passportno: [''],
    process: [''],
    schoolid: [''],
    offset: [''],
    row: [''],
  });

  processList: SchRequestProcess[] = [];
  statusList?: SchRequestStatus[] = [];

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );

    this.processList = SelfRequestProcess.filter((i) => {
      return `${i.requestType}` === '40' && i.processId === 1;
    });

    this.statusList = this.processList.find(
      (p) => `${p.processId}` === '1'
    )?.status;
  }

  ngOnInit(): void {}
}
