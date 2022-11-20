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
  selector: 'ksp-e-service-reward-search',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, ReactiveFormsModule],
  templateUrl: './e-service-reward-search.component.html',
  styleUrls: ['./e-service-reward-search.component.scss'],
})
export class EServiceRewardSearchComponent
  extends KspFormBaseComponent
  implements OnInit
{
  @Input() disableRequestType = false;
  @Input() requestTypeList = SelfRequestType;
  @Input() careerTypeList: any[] = [];
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

    // this.form.controls.requesttype.valueChanges
    //   .pipe(untilDestroyed(this))
    //   .subscribe((requestType) => {
    //     // update subtype list
    //     if (requestType !== '3') {
    //       this.form.controls.careertype.disable();
    //     } else {
    //       this.form.controls.careertype.enable();
    //     }

    //     // update process list
    //     this.processList = SelfRequestProcess.filter((i) => {
    //       return `${i.requestType}` === requestType;
    //     });
    //   });

    this.processList = SelfRequestProcess.filter((i) => {
      return `${i.requestType}` === '1' && i.processId > 1;
    });

    this.statusList = this.processList.find(
      (p) => `${p.processId}` === '3'
    )?.status;

    // this.form.controls.process.valueChanges.subscribe((currentProcess) => {
    //   this.statusList = this.processList.find(
    //     (p) => `${p.processId}` === currentProcess
    //   )?.status;
    //   //console.log('status list = ', this.statusList);
    // });
  }

  ngOnInit(): void {
    if (this.disableRequestType) {
      // this.form.controls.requesttype.disable();
    }
  }
}
