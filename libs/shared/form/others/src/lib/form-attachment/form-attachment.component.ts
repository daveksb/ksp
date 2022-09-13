import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormMode } from '@ksp/shared/interface';
import { FilesPreviewComponent } from '@ksp/shared/dialog';
import { RequestPageType } from '@ksp/shared/constant';

@Component({
  selector: 'ksp-form-attachment',
  templateUrl: './form-attachment.component.html',
  styleUrls: ['./form-attachment.component.scss'],
})
export class FormAttachmentComponent {
  @Input() title = `กรุณาแนบหลักฐานประกอบ`;
  @Input() titleClass = ``;
  @Input() titleNote = '';
  @Input() pageType!: RequestPageType; // ใช้ อ้างอิง tab ในหน้าใบคำขอเพื่อระบุรายการไฟล์ ที่เกี่ยวข้อง enum RequestPageType
  @Input() groups: any[] = [];
  @Input() mode: FormMode = 'edit';
  @Input() uniqueTimestamp = '';
  @Output() downloadClick = new EventEmitter<any>();

  fileName: string[] = [];

  constructor(public dialog: MatDialog) {}

  view() {
    const dialogRef = this.dialog.open(FilesPreviewComponent, {
      width: '800px',
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.dialog.closeAll();
      }
    });
  }
}
