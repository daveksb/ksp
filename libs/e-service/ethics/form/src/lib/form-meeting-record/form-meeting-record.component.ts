import { KspFormBaseComponent } from '@ksp/shared/interface';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from '@ksp/shared/form/file-upload';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { providerFactory } from '@ksp/shared/utility';
import { v4 as uuidv4 } from 'uuid';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { UniInfoService } from '@ksp/shared/service';
import { map } from 'rxjs';

@Component({
  selector: 'e-service-form-meeting-record',
  standalone: true,
  imports: [
    CommonModule,
    FileUploadComponent,
    ReactiveFormsModule,
    MatDatepickerModule,
    SharedFormOthersModule,
  ],
  template: ` <p>form-meeting-record works!</p> `,
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
  boardOption: any = [];
  @Input() showBoxHeader = 'บันทึกมติที่ประชุมคณะอนุกรรมการ';
  @Input() displayHeader =  true;

  constructor(private fb: FormBuilder, private uniInfo: UniInfoService) {
    super();
    this.uniqueNo = uuidv4();
    this.subscriptions.push(
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
    this.uniInfo
      .getBoard()
      .pipe(
        map((res) =>
          res?.datareturn?.map((d: any) => ({
            value: d?.boardname,
            label: d?.boardname,
          }))
        )
      )
      .subscribe((res) => {
        this.boardOption = res;
      });
  }
  onUploadComplete(evt: any) {
    this.form.controls.file.setValue(evt);
  }
}
