import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  EduOccupyList,
  RequestProcess,
  RequestProcessList,
  RequestStatus,
  SchoolRequestType,
} from '@ksp/shared/constant';
import { MatTooltipModule } from '@angular/material/tooltip';

@UntilDestroy()
@Component({
  selector: 'ksp-temp-license-search',
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, MatTooltipModule],
  templateUrl: './request-search.component.html',
  styleUrls: ['./request-search.component.scss'],
  providers: providerFactory(RequestSearchComponent),
})
export class RequestSearchComponent extends KspFormBaseComponent {
  @Output() clear = new EventEmitter<boolean>(false);
  @Output() search = new EventEmitter<any>();
  eduOccupyList = EduOccupyList;
  processList: RequestProcess[] = [];
  statusList?: RequestStatus[] = [];
  SchoolRequestType = SchoolRequestType;

  override form = this.fb.group({
    requesttype: [null, Validators.required],
    requestno: [null],
    subtype: [{ value: null }],
    firstnameth: [null],
    idcardno: [null],
    passportno: [null],
    currentprocess: [null],
    requeststatus: [null],
    requestdatefrom: [null],
    requestdateto: [null],
  });

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
        if (requestType !== '3') {
          this.form.controls.subtype.disable();
        } else {
          this.form.controls.subtype.enable();
        }

        // update process list
        this.processList = RequestProcessList.filter((i) => {
          return `${i.requestType}` === requestType;
        });
      });

    this.form.controls.currentprocess.valueChanges.subscribe(
      (currentProcess) => {
        this.statusList = this.processList.find(
          (p) => `${p.processId}` === currentProcess
        )?.status;

        //console.log('status list = ', this.statusList);
      }
    );
  }
}
