import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from '@ksp/shared/form/file-upload';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'ksp-form-meeting-record',
  standalone: true,
  imports: [CommonModule, FileUploadComponent, ReactiveFormsModule],
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

  constructor(private fb: FormBuilder) {}
}
