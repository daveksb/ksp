import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormMode } from '@ksp/shared/interface';
import { FilesPreviewComponent } from '@ksp/shared/dialog';
import { FileService } from '@ksp/shared/form/file-upload';
import { FileGroup, KspFile } from '@ksp/shared/constant';

@Component({
  selector: 'ksp-form-attachment',
  templateUrl: './form-attachment.component.html',
  styleUrls: ['./form-attachment.component.scss'],
})
export class FormAttachmentComponent {
  @Input() title = `กรุณาแนบหลักฐานประกอบ`;
  @Input() titleClass = ``;
  @Input() titleNote = '';
  @Input() pageType!: string; // ใช้ อ้างอิง tab ในหน้าใบคำขอเพื่อระบุรายการไฟล์ ที่เกี่ยวข้อง enum RequestPageType
  @Input() groups: FileGroup[] = [];
  @Input() mode: FormMode = 'edit';
  @Input() uniqueTimestamp = '';
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

  deleteFile(file: KspFile) {
    const payload = {
      id: file.fileid,
      requesttype: this.requestType,
      uniquetimestamp: this.uniqueTimestamp ?? file?.uniquetimestamp,
    };

    this.fileService.deleteFile(payload).subscribe((res: any) => {
      if (res?.returnmessage == 'success') {
        file.fileid = '';
        file.filename = '';
      }
    });
  }

  downloadFile(file: KspFile) {
    const id = file.fileid;
    //console.log(group);
    this.fileService.downloadFile({ id }).subscribe((res: any) => {
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = atob(res.file);
      a.download = file.filename;
      document.body.appendChild(a);
      a.click();
    });
  }

  updateComplete(file: any, group: any) {
    const { fileId, fileName } = file;
    group.files.push({ fileId, fileName });
    this.uploadComplete.emit(this.groups);
  }
}
