import { KspFormBaseComponent } from '@ksp/shared/interface';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileMultiUploadComponent, FileUploadComponent } from '@ksp/shared/form/file-upload';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { providerFactory } from '@ksp/shared/utility';
import { v4 as uuidv4 } from 'uuid';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { UniInfoService } from '@ksp/shared/service';
import { map } from 'rxjs';
import { PdfViewerComponent } from '@ksp/shared/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'e-service-form-followup-record',
  standalone: true,
  imports: [
    CommonModule,
    FileUploadComponent,
    ReactiveFormsModule,
    MatDatepickerModule,
    SharedFormOthersModule,
    FileMultiUploadComponent
  ],
  template: ` <p>form-followup-record works!</p> `,
  templateUrl: './form-followup-record.component.html',
  styleUrls: ['./form-followup-record.component.scss'],
  providers: providerFactory(FormFollowUpRecordComponent),
})
export class FormFollowUpRecordComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    schoolname: ['', Validators.required],
    followdate: ['', Validators.required],
    resultdate: ['', Validators.required],
    followresult: ['', Validators.required],
    file: [[], Validators.required],
  });
  uniqueNo = '';
  boardOption: any = [];
  @Input() showBoxHeader = 'บันทึกมติที่ประชุมคณะอนุกรรมการ';
  @Input() displayHeader =  true;

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
    this.form.controls.file.setValue(evt.files);
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
        mode: 'view'
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('');
    });
  }
}
