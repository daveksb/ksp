import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PDFDocument } from 'pdf-lib';

import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { FileGroup } from '@ksp/shared/interface';

@Component({
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, NgxExtendedPdfViewerModule],
})
export class PdfViewerComponent implements OnInit {
  pdfBytes: any;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      pdfType: number;
      group: FileGroup;
    }
  ) {}

  ngOnInit(): void {
    this.modifyPdf();
  }

  async modifyPdf() {
    const existingPdfBytes = await fetch(
      'assets/pdf/school-temp-license.pdf'
    ).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    this.pdfBytes = await pdfDoc.save();

    /*  const fontBytes = await fetch(
      this.data.fontSrc || 'assets/font/ksp/ksp-regular.ttf'
    ).then((res) => res.arrayBuffer());
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(fontBytes, { subset: false });

    const pages = pdfDoc.getPages();
    this.createPdf(pdf.input, pages, customFont);
    this.pdfBytes = await pdfDoc.save(); */
  }

  /*   createPdf(input: IKspInput[][], pages: PDFPage[], customFont: PDFFont) {
    for (const index in pages) {
      if (!input[index]) return;
    }
  } */
}
