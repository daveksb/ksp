import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  KspFormBaseComponent,
  SchRequestProcess,
  SchRequestStatus,
} from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { selfOccupyList } from '@ksp/shared/constant';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FileUploadComponent } from '@ksp/shared/form/file-upload';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'ksp-e-service-license-save-result',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    FileUploadComponent,
  ],
  templateUrl: './e-service-license-save-result.component.html',
  styleUrls: ['./e-service-license-save-result.component.scss'],
  providers: providerFactory(EServiceLicenseSaveResultComponent),
})
export class EServiceLicenseSaveResultComponent
  extends KspFormBaseComponent
  implements OnInit
{
  @Output() cancel = new EventEmitter<boolean>(false);
  @Output() save = new EventEmitter<any>();

  eduOccupyList = selfOccupyList;
  processList: SchRequestProcess[] = [];
  statusList?: SchRequestStatus[] = [];
  uniqueTimestamp!: string;

  override form = this.fb.group({
    no: [null, Validators.required],
    date: [null, Validators.required],
    boardname: [null],
    presidentname: [null],
    result: [null, Validators.required],
    detail: [null],
    urgent: [false],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.subscribe((value: any) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
    this.uniqueTimestamp = uuidv4();
  }
}
