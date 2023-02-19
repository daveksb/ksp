import { map } from 'rxjs';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileMultiUploadComponent, FileUploadComponent } from '@ksp/shared/form/file-upload';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { providerFactory } from '@ksp/shared/utility';
import { v4 as uuidv4 } from 'uuid';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { UniInfoService } from '@ksp/shared/service';
import { PdfViewerComponent } from '@ksp/shared/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'e-service-form-approve-meeting-record',
  standalone: true,
  imports: [
    CommonModule,
    FileUploadComponent,
    ReactiveFormsModule,
    MatDatepickerModule,
    SharedFormOthersModule,
    FileMultiUploadComponent
  ],
  template: ` <p>form-meeting-record works!</p> `,
  templateUrl: './form-approve-meeting-record.component.html',
  styleUrls: ['./form-approve-meeting-record.component.scss'],
  providers: providerFactory(FormApproveMeetingRecordComponent),
})
export class FormApproveMeetingRecordComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    reasonTimes: [],
    date: [],
    boardType: [],
    boardName: [],
    chairmanName: [],
    file: [],
    year: [],
  });
  uniqueNo = '';
  boardOption: any = [];
  constructor(private fb: FormBuilder, private uniInfo: UniInfoService, public dialog: MatDialog) {
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
  view() {
    const e = this.form.getRawValue() as any;
    const dialogRef = this.dialog.open(PdfViewerComponent, {
      width: '1200px',
      height: '100vh',
      data: {
        title: e?.file?.filename,
        files: [e?.file],
        checkresult: [],
        systemType: 'ksp',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('');
    });
  }
}
