import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormMode } from '@ksp/shared/interface';
import { FilesPreviewComponent } from '@ksp/shared/dialog';
import { RequestPageType } from '@ksp/shared/constant';
import { FileService } from '@ksp/shared/form/file-upload';

@Component({
  selector: 'ksp-form-attachment',
  templateUrl: './form-attachment.component.html',
  styleUrls: ['./form-attachment.component.scss'],
})
export class FormAttachmentComponent {
  @Input() title = `กรุณาแนบหลักฐานประกอบ`;
  @Input() titleClass = ``;
  @Input() titleNote = '';
  @Input() pageType!: string; // ใช้ อ้างอิง tab ในหน้าแบบคำขอเพื่อระบุรายการไฟล์ ที่เกี่ยวข้อง enum RequestPageType
  @Input() groups: any[] = [];
  @Input() mode: FormMode = 'edit';
  @Input() uniqueTimestamp: string | null = null;
  @Input() requestType: number | null = null;
  @Output() downloadClick = new EventEmitter<any>();
  @Output() uploadComplete = new EventEmitter<any>();

  constructor(public dialog: MatDialog, private fileService: FileService) {}

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

  deleteFile(group: any) {
    const payload = {
      id: group.fileid,
      requesttype: this.requestType,
      uniquetimestamp: this.uniqueTimestamp ?? group?.uniqueTimestamp,
    };

    this.fileService.deleteFile(payload).subscribe((res: any) => {
      if (res?.returnmessage == 'success') {
        group.fileid = '';
        group.filename = '';
      }
    });
  }

  downloadFile(group: any) {
    const id = group.fileid;
    //console.log(group);
    this.fileService.downloadFile({ id }).subscribe((res: any) => {
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = atob(res.file);
      a.download = group.filename;
      document.body.appendChild(a);
      a.click();
    });
  }

  updateComplete(file: any, group: any) {
    const { fileid, filename } = file;
    group.fileid = fileid;
    group.filename = filename;
    this.uploadComplete.emit(this.groups);
  }
}
