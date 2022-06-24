import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';

@Component({
  selector: 'ksp-files-preview',
  templateUrl: './files-preview.component.html',
  styleUrls: ['./files-preview.component.scss'],
  standalone: true,
  imports: [CommonModule, LicenseCheckComponent],
})
export class FilesPreviewComponent {
  fileVerify = ['รับเอกสารแล้ว', 'ขอเอกสารเพิ่มเติม'];

  @Output() confirmed = new EventEmitter<boolean>();
  confirm() {
    this.confirmed.emit(true);
  }
}
