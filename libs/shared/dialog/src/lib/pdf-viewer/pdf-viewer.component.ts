import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'ksp-pdf-viewer-preview',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    LicenseCheckComponent,
    MatDialogModule,
    NgxExtendedPdfViewerModule,
  ],
})
export class PdfViewerComponent implements OnInit {
  pdfBytes: any;
  ngOnInit(): void {
    this.modifyPdf();
  }
  async modifyPdf() {
    const url = 'assets/pdf/example.pdf';
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    // const fontBytes = 'http://www.fontsaddict.com/fontface/thalia-normal.ttf';
    const urlF = 'assets/font/ksp/ksp-regular.ttf';
    const fontBytes = await fetch(urlF).then((res) => res.arrayBuffer());
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(fontBytes, { subset: false });

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    firstPage.drawText('เฮงงงงงงงงงงงงง', {
      x: 165,
      y: 675,
      size: 25,
      font: customFont,
      color: rgb(0.95, 0.1, 0.1),
      // rotate: degrees(0),
    });

    this.pdfBytes = await pdfDoc.save();
  }
}
