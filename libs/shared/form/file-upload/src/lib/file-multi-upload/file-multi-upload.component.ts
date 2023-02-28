import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatIconModule } from '@angular/material/icon';
import { getBase64 } from '@ksp/shared/utility';
import { FileUpload, ImageUpload, KspFile } from '@ksp/shared/interface';
import {
  PdfViewerComponent,
  PdfViewerNoLicenseComponent,
} from '@ksp/shared/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FileService } from '../file-upload/file-upload.service';

@UntilDestroy()
@Component({
  selector: 'ksp-file-multi-upload',
  standalone: true,
  templateUrl: './file-multi-upload.component.html',
  styleUrls: ['./file-multi-upload.component.scss'],
  imports: [CommonModule, MatIconModule, HttpClientModule],
})
export class FileMultiUploadComponent {
  @Input() mode: any;
  @Input() requiredFileType!: string;
  @Input() buttonLabel = 'อัพโหลดไฟล์';
  @Input() systemFileName = '-'; // รายชื่ออ้างอิงในระบบ เช่น 'หนังสือนำส่งจากสถานศึกษา (ฉบับจริงและวันที่ออกหนังสือไม่เกิน 30 วัน)', 'รูปถ่าย 1 นิ้ว'
  @Input() pageType!: string; // tab ที่เรียกใช้งาน
  @Input() showUploadedFileName = true;
  @Input() requestType: number | null = null; // 1,2 no token required
  @Input() uniqueTimestamp = '';
  @Input() uploadType: 'button' | 'link' = 'button';
  @Input() isImage = false; // when upload image use public API
  @Input() showDeleteFile = false;
  @Input() maxSize: number | null = null;
  @Output() uploadComplete = new EventEmitter<any>();
  @Input() systemType: string | null = null;
  @Input() groupName = '';
  @Input() groupFiles: KspFile[] = [];

  // file: any;
  tempFileName = '';

  constructor(private uploadService: FileService, public dialog: MatDialog) {}

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (this.inValidFileType(file.type)) {
      alert('Invalid File Type !');
      return;
    }
    const base64 = (await getBase64(file)) as string;
    //console.log(this.pageType);

    if (this.maxSize && file.size > this.maxSize) {
      alert('File Size Exceeded the Maximum Size');
      return;
    }

    if (this.isImage) {
      const payload: ImageUpload = {
        uniquetimestamp: this.uniqueTimestamp,
        originalname: file.name,
        filetype: '1',
        file: btoa(base64),
      };
      this.uploadImage(payload);
    } else {
      const payload: FileUpload & { filedata?: string } = {
        pagetype: this.pageType,
        originalname: file.name,
        systemname: this.systemFileName,
        file: btoa(base64),
        filedata: btoa(base64),
        uniquetimestamp: this.uniqueTimestamp,
        requesttype: this.requestType?.toString() ?? '3',
      };
      this.uploadFile(payload);
    }
  }

  uploadFile(payload: any) {
    this.uploadService
      .uploadFile(payload)
      .pipe(untilDestroyed(this))
      .subscribe((event: any) => {
        if (event.status == 200 && event.body?.id) {
          const evt = {
            fileid: event.body.id,
            filename: payload.originalname,
            file: atob(payload.filedata),
          };
          this.groupFiles.push({ fileid: evt.fileid, filename: evt.filename });
          this.uploadComplete.emit({
            name: this.groupName,
            files: this.groupFiles,
          });
        }
      });
  }

  uploadImage(payload: any) {
    this.uploadService
      .uploadImage(payload)
      .pipe(untilDestroyed(this))
      .subscribe((event: any) => {
        if (event.status == 200 && event.body?.id) {
          this.groupFiles.push({
            fileid: event.body.id,
            filename: payload.originalname,
          });
          this.uploadComplete.emit({
            fileid: event.body.id,
            filename: payload.originalname,
            file: atob(payload.file),
          });
        }
      });
  }

  deleteFile(file: KspFile) {
    const payload = {
      id: file.fileid,
      requesttype: this.requestType,
      uniquetimestamp: this.uniqueTimestamp ?? file?.uniquetimestamp,
    };

    this.uploadService.deleteFile(payload).subscribe((res: any) => {
      if (res.returnmessage == 'success') {
        this.groupFiles = this.groupFiles.filter(
          (f) => f.fileid != file.fileid
        );
        this.uploadComplete.emit({
          name: this.groupName,
          files: this.groupFiles,
        });
      }
    });
  }

  inValidFileType(type: string) {
    switch (type) {
      case 'image/png':
        return false;
      case 'image/jpg':
        return false;
      case 'image/jpeg':
        return false;
      case 'application/pdf':
        return false;
      default:
        return true;
    }
  }

  view() {
    if (this.systemType == 'uni' || this.systemType == 'ksp') {
      this.dialog.open(PdfViewerNoLicenseComponent, {
        width: '1200px',
        height: '100vh',
        data: {
          title: this.groupName,
          files: this.groupFiles,
          checkresult: [],
          systemType: this.systemType,
        },
      });
    } else {
      const dialogRef = this.dialog.open(PdfViewerComponent, {
        width: '1200px',
        height: '100vh',
        data: {
          title: this.groupName,
          files: this.groupFiles,
          checkresult: [],
          systemType: this.systemType,
        },
      });
      dialogRef.afterClosed().subscribe();
    }
  }
}
