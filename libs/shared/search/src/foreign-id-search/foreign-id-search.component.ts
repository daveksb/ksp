/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  KspFormBaseComponent,
} from '@ksp/shared/interface';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  EduOccupyList,
  RequestProcess,
  RequestStatus,
  SchoolRequestType,
} from '@ksp/shared/constant';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

@UntilDestroy()
@Component({
  selector: 'ksp-foreign-id-search',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  templateUrl: './foreign-id-search.component.html',
  styleUrls: ['./foreign-id-search.component.scss'],
  providers: providerFactory(ForeignIdSearchComponent),
})
export class ForeignIdSearchComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    requestno: [''],
    uniid: [''],
    name: [''],
    passportno: [''],
    requestdatefrom: [''],
    requestdateto: [''],
    offset: [''],
    row: [''],
  });
  @Input() uniUniversityOption: Array<any> = [];
  @Output() clear = new EventEmitter<boolean>(false);
  @Output() search = new EventEmitter<any>();
  @Input() disableRequestType = false;
  @Input() requestTypeList = SchoolRequestType;

  eduOccupyList = EduOccupyList;
  processList: RequestProcess[] = [];
  statusList?: RequestStatus[] = [];

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {}
}
