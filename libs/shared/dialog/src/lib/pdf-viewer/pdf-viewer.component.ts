import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PDFDocument } from 'pdf-lib';

import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { KspFile } from '@ksp/shared/interface';
import { FileService } from '@ksp/shared/form/file-upload';

@Component({
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, NgxExtendedPdfViewerModule],
})
export class PdfViewerComponent implements OnInit {
  pdfBytes: any;
  src = '';
  type = '';
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      file: KspFile;
    },
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    const id = this.data.file.fileid;
    this.fileService.downloadSchoolFile({ id }).subscribe((res: any) => {
      const extension = this.data.file.filename.split('.')[1];
      const src = atob(res?.filedata ?? '');
      this.type = extension;
      if (extension == 'pdf') {
        this.modifyPdf(src);
      } else {
        this.src = src;
      }
    });
  }
  async modifyPdf(src: string) {
    const pdfDoc = await PDFDocument.load(src);
    this.pdfBytes = await pdfDoc.save();
  }
}
