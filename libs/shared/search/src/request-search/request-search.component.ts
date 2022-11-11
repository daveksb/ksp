import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  KspFormBaseComponent,
  SchRequestProcess,
  SchRequestSearchFilter,
  SchRequestStatus,
} from '@ksp/shared/interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SchoolRequestProcess, SchoolRequestType } from '@ksp/shared/constant';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

@UntilDestroy()
@Component({
  selector: 'ksp-school-request-search',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatInputModule,
  ],
  templateUrl: './request-search.component.html',
  styleUrls: ['./request-search.component.scss'],
  providers: providerFactory(RequestSearchComponent),
})
export class RequestSearchComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    requesttype: ['', Validators.required],
    requestno: [''],
    careertype: [],
    name: [''],
    idcardno: [''],
    passportno: [''],
    process: [''],
    status: [''],
    requestdatefrom: [''],
    requestdateto: [''],
    schoolid: [''],
    offset: [''],
    row: [''],
  });

  @Output() clear = new EventEmitter<boolean>(false);
  @Output() search = new EventEmitter<Partial<SchRequestSearchFilter>>();
  @Input() disableRequestType = false;
  @Input() requestTypeList = SchoolRequestType;
  @Input() careerTypeList: any[] = [];

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

    this.form.controls.requesttype.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((requestType) => {
        // update subtype list
        if (requestType === '3' || requestType === '6') {
          this.form.controls.careertype.enable();
        } else {
          this.form.controls.careertype.disable();
        }

        // update process list
        this.processList = SchoolRequestProcess.filter((i) => {
          return `${i.requestType}` === requestType;
        });
      });

    this.form.controls.process.valueChanges.subscribe((currentProcess) => {
      this.statusList = this.processList.find(
        (p) => `${p.processId}` === currentProcess
      )?.status;
      //console.log('status list = ', this.statusList);
    });
  }

  ngOnInit(): void {
    if (this.disableRequestType) {
      this.form.controls.requesttype.disable();
    }
  }
}
