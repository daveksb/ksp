import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import { PDFDocument, PDFFont, PDFPage } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { IKspInput, kspPdfMapping } from '@ksp/shared/interface';
import _ from 'lodash';

@Component({
  selector: 'ksp-pdf-viewer-preview',
  templateUrl: './pdf-render.component.html',
  styleUrls: ['./pdf-render.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    LicenseCheckComponent,
    MatDialogModule,
    NgxExtendedPdfViewerModule,
  ],
})
export class PdfRenderComponent implements OnInit {
  pdfBytes: any;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      pdfType: number;
      pdfSubType: number;
      fontSrc: string;
      input: any;
    }
  ) {}

  ngOnInit(): void {
    if (this.data.pdfType) this.modifyPdf();
  }

  async modifyPdf() {
    const subType = this.data.pdfSubType ?? '1';
    const pdf = kspPdfMapping.find(
      (item) => item.pdfType == this.data.pdfType && item.pdfSubType == subType
    );
    if (!pdf) return;
    const existingPdfBytes = await fetch(pdf?.pdfSrc).then((res) =>
      res.arrayBuffer()
    );
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const fontBytes = await fetch(
      this.data.fontSrc || 'assets/font/ksp/ksp-regular.ttf'
    ).then((res) => res.arrayBuffer());
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(fontBytes, { subset: false });

    const pages = pdfDoc.getPages();
    this.createPdf(pdf.input, pages, customFont);
    this.pdfBytes = await pdfDoc.save();
  }

  createPdf(input: IKspInput[], pages: PDFPage[], customFont: PDFFont) {
    for (const index in pages) {
      if (!input[index]) return;
      for (const param of input[index].text) {
        const dataRender = this.data.input[param.key] || '';
        pages[index].drawText(dataRender, {
          ...param.options,
          font: customFont,
        });
      }
      for (const param of input[index].svg) {
        if (this.data.input[param.key]) {
          pages[index].drawSvgPath(param.svgPath, {
            ...param.options,
          });
        }
      }
    }
  }
}
