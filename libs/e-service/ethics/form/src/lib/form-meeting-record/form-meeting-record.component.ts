import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from '@ksp/shared/form/file-upload';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
@Component({
  selector: 'e-service-form-meeting-record',
  standalone: true,
  imports: [
    CommonModule,
    FileUploadComponent,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  template: ` <p>form-meeting-record works!</p> `,
  templateUrl: './form-meeting-record.component.html',
  styleUrls: ['./form-meeting-record.component.scss'],
})
export class FormMeetingRecordComponent {
  form = this.fb.group({
    reasonTimes: [],
    date: [],
    boardType: [],
    boardName: [],
    chairmanName: [],
  });

  @Input() showBoxHeader = 'บันทึกมติที่ประชุมคณะอนุกรรมการ';

  constructor(private fb: FormBuilder) {}
}
