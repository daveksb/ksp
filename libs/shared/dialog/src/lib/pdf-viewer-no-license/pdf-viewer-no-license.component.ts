import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PDFDocument } from 'pdf-lib';

import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { KspCheckResult, KspFile } from '@ksp/shared/interface';
import { FileService } from '@ksp/shared/form/file-upload';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { IPdf } from '../pdf-viewer/pdf-viewer.component';

@Component({
  templateUrl: './pdf-viewer-no-license.component.html',
  styleUrls: ['./pdf-viewer-no-license.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    NgxExtendedPdfViewerModule,
    LicenseCheckComponent,
    ReactiveFormsModule,
  ],
})
export class PdfViewerNoLicenseComponent implements OnInit {
  pdfBytes: any;
  pdfList: IPdf[] = [];
  index!: number | null;
  verifyChoice = [
    {
      name: 'อนุมัติ',
      value: 1,
    },
    {
      name: 'ไม่อนุมัติ',
      value: 0,
    },
  ];
  form = this.fb.group({
    checkResult: this.fb.array([]),
  });
  selected!: IPdf | null;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      group: string;
      files: KspFile[];
      checkresult: KspCheckResult[];
      systemType: string;
    },
    private fb: FormBuilder,
    private fileService: FileService,
    private sanitizer: DomSanitizer
  ) {}
  get checkResultFormArray() {
    return this.form.controls.checkResult as FormArray;
  }
  ngOnInit(): void {
    this.addCheckResultArray(this.data.files.length);
    setTimeout(() => {
      console.log(this.data.checkresult);
      this.checkResultFormArray.controls.forEach((form, index) =>
        form.patchValue(this.data.checkresult[index] ?? {})
      );
    }, 0);

    this.pdfList = this.setDefault(this.data.files.length);
    this.getAllFileData();
  }

  getFile(index: number) {
    const file = this.data.files[index];
    const id = file.fileid;
    if (this.data.systemType == 'uni') {
      this.fileService.downloadUniFile({ id }).subscribe((res: any) => {
        const extension = this.pdfList[index].type;
        const src = atob(res?.filedata ?? '');
        if (extension == 'pdf') {
          this.downloading(src, index);
        } else {
          this.pdfList[index].src = src;
          this.pdfList[index].loading = false;
        }
      });
    } else {
      this.fileService.downloadSchoolFile({ id }).subscribe((res: any) => {
        const extension = this.pdfList[index].type;
        const src = atob(res?.filedata ?? '');
        if (extension == 'pdf') {
          this.downloading(src, index);
        } else {
          this.pdfList[index].src = src;
          this.pdfList[index].view = src;
          this.pdfList[index].loading = false;
        }
      });
    }
  }
  async downloading(src: string, index: number) {
    const pdfDoc = await PDFDocument.load(src);
    const base64 = (await pdfDoc.saveAsBase64({ dataUri: true })) || '';
    this.pdfList[index].src =
      this.sanitizer.bypassSecurityTrustResourceUrl(base64);
    this.pdfList[index].view = await pdfDoc.save();
    this.pdfList[index].loading = false;
  }
  addCheckResultArray(count: number) {
    for (let i = 0; i < count; i++) {
      this.checkResultFormArray.push(this.fb.control([]));
    }
  }
  mappingFile(files: KspFile[]) {
    files.map((file) => {
      const id = file.fileid;
      return this.fileService.downloadSchoolFile({ id });
    });
  }
  setDefault(count: number) {
    const pdfList = [];
    for (let i = 0; i < count; i++) {
      pdfList.push({
        loading: true,
        type: this.getExtension(this.data.files[i]),
        src: this.sanitizer.bypassSecurityTrustResourceUrl(
          '/assets/images/empty.png'
        ),
        view: this.sanitizer.bypassSecurityTrustResourceUrl(
          '/assets/images/empty.png'
        ),
      });
    }
    return pdfList;
  }
  getExtension(file: KspFile) {
    const extension = file.filename.split('.')[1];
    return extension;
  }
  getAllFileData() {
    for (const index in this.data.files) {
      this.getFile(parseInt(index));
    }
  }
  selectFile(file: IPdf, index: number) {
    this.selected = file;
    this.index = null;
    setTimeout(() => {
      this.index = index;
    }, 0);
  }
}