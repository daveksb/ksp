import { KspFormBaseComponent } from '@ksp/shared/interface';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from '@ksp/shared/form/file-upload';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { providerFactory } from '@ksp/shared/utility';
import { v4 as uuidv4 } from 'uuid';
import { SharedFormOthersModule } from '@ksp/shared/form/others';

@Component({
  selector: 'ksp-license-request-form-meeting-record',
  standalone: true,
  imports: [
    CommonModule,
    FileUploadComponent,
    ReactiveFormsModule,
    MatDatepickerModule,
    SharedFormOthersModule,
  ],
  templateUrl: './form-meeting-record.component.html',
  styleUrls: ['./form-meeting-record.component.scss'],
  providers: providerFactory(FormMeetingRecordComponent),
})
export class FormMeetingRecordComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    reasonTimes: [],
    date: [],
    boardType: [],
    boardName: [],
    chairmanName: [],
    file: [],
  });
  uniqueNo = '';

  @Input() showBoxHeader = 'บันทึกมติที่ประชุมคณะอนุกรรมการ';

  constructor(private fb: FormBuilder) {
    super();
    this.uniqueNo = uuidv4();
    this.subscriptions.push(
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
  onUploadComplete(evt: any) {
    this.form.controls.file.setValue(evt);
  }
}
