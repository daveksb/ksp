import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileGroup, FormMode, KspFile } from '@ksp/shared/interface';
import {
  PdfViewerComponent,
  PdfViewerNoLicenseComponent,
} from '@ksp/shared/dialog';
import { FileService } from '@ksp/shared/form/file-upload';

@Component({
  selector: 'ksp-form-multi-attachment',
  templateUrl: './form-multi-attachment.component.html',
  styleUrls: ['./form-multi-attachment.component.scss'],
})
export class FormMultiAttachmentComponent {
  @Input() titleClass = ``;
  @Input() titleNote = '';
  @Input() pageType!: string; // ใช้ อ้างอิง tab ในหน้าแบบคำขอเพื่อระบุรายการไฟล์ ที่เกี่ยวข้อง enum RequestPageType
  @Input() groups: FileGroup[] = [];
  @Input() mode: FormMode = 'edit';
  @Input() viewFileMode: FormMode = 'edit';
  @Input() title = 'กรุณาแนบหลักฐานประกอบ';
  @Input() uniqueTimestamp = '';
  @Input() requestType: number | null = null;
  @Input() systemType: string | null = null;
  @Output() downloadClick = new EventEmitter<any>();
  @Output() uploadComplete = new EventEmitter<any>();
  @Output() confirmChoice = new EventEmitter<any>();

  constructor(public dialog: MatDialog, private fileService: FileService) {}

  view(group: FileGroup) {
    if (this.systemType != 'uni' && this.systemType != 'e-service-uni') {
      const dialogRef = this.dialog.open(PdfViewerComponent, {
        width: '1200px',
        height: '100vh',
        position: {
          top: '0px',
          right: '0px',
        },
        data: {
          title: group.name,
          files: group.files,
          checkresult: group?.checkresult ?? [],
          systemType: this.systemType,
        },
      });
      dialogRef
        .afterClosed()
        .subscribe((result) => (group.checkresult = result.checkResult));
      //console.log('checkresult = ', group?.checkresult);
    } else {
      const dialogRef = this.dialog.open(PdfViewerNoLicenseComponent, {
        width: '1200px',
        height: '100vh',
        position: {
          top: '0px',
          right: '0px',
        },
        data: {
          title: group.name,
          files: group.files,
          checkresult: group?.checkresult ?? [],
          systemType: this.systemType,
          mode: this.viewFileMode
        },
      });
      dialogRef
        .afterClosed()
        .subscribe((result) => (group.checkresult = result.checkResult));
    }
  }

  mapDisplay(result: any) {
    if (result) {
      return result == 'complete' ? 'รับเอกสารแล้ว' : 'ขอเอกสารเพิ่มเติม'
    }
    return '';
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
    if (this.mode === 'view') {
      return;
    }
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
    const { fileid, filename } = file;
    group.files.push({ fileid, filename });
    //console.log(group.files);
    this.uploadComplete.emit(this.groups);
  }
}
