import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';

@Component({
  selector: 'ksp-files-preview',
  templateUrl: './files-preview.component.html',
  styleUrls: ['./files-preview.component.scss'],
  standalone: true,
  imports: [CommonModule, LicenseCheckComponent, MatDialogModule],
})
export class FilesPreviewComponent {
  fileVerify = [
    {
      name: 'รับเอกสารแล้ว',
      value: 1,
    },
    {
      name: 'ขอเอกสารเพิ่มเติม',
      value: 2,
    },
  ];

  @Output() confirmed = new EventEmitter<boolean>();
  confirm() {
    this.confirmed.emit(true);
  }
}
