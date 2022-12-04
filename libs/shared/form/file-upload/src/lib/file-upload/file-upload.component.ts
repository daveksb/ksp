import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatIconModule } from '@angular/material/icon';
import { getBase64 } from '@ksp/shared/utility';
import { FileService } from './file-upload.service';
import {
  FileGroup,
  FileUpload,
  ImageUpload,
  KspFile,
} from '@ksp/shared/interface';

import { MatDialog } from '@angular/material/dialog';
import {
  PdfViewerComponent,
  PdfViewerNoLicenseComponent,
} from '@ksp/shared/dialog';

@UntilDestroy()
@Component({
  selector: 'ksp-file-upload',
  standalone: true,
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  imports: [CommonModule, MatIconModule, HttpClientModule],
})
export class FileUploadComponent {
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
  @Input() filename = '';
  @Input() fileid = '';
  @Input() showDeleteFile = false;
  @Input() maxSize: number | null = null;
  @Output() uploadComplete = new EventEmitter<any>();
  @Input() systemType: string | null = null;

  file: any;

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
      alert('File Size Exceeded the Maximum Size !');
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
      const payload: FileUpload = {
        pagetype: this.pageType,
        originalname: file.name,
        systemname: this.systemFileName,
        file: btoa(base64),
        uniquetimestamp: this.uniqueTimestamp,
        requesttype: this.requestType?.toString() ?? '3',
      };
      this.uploadFile(payload);
    }
    if (file) {
      this.filename = file.name;
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
            filename: this.filename,
            file: atob(payload.file),
          };
          this.file = evt;
          this.uploadComplete.emit(evt);
        }
      });
  }

  uploadImage(payload: any) {
    this.uploadService
      .uploadImage(payload)
      .pipe(untilDestroyed(this))
      .subscribe((event: any) => {
        if (event.status == 200 && event.body?.id) {
          this.uploadComplete.emit({
            fileid: event.body.id,
            filename: this.filename,
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
        this.fileid = '';
        this.filename = '';
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
    if (this.systemType != 'uni') {
      const dialogRef = this.dialog.open(PdfViewerComponent, {
        width: '1200px',
        height: '100vh',
        data: {
          title: this.filename,
          files: [
            {
              fileid: this.fileid,
              filename: this.filename,
            },
          ],
          checkresult: [],
          systemType: this.systemType,
        },
      });
      dialogRef.afterClosed().subscribe();
    } else {
      this.dialog.open(PdfViewerNoLicenseComponent, {
        width: '1200px',
        height: '100vh',
        data: {
          title: this.filename,
          files: [
            {
              fileid: this.fileid,
              filename: this.filename,
            },
          ],
          checkresult: [],
          systemType: this.systemType,
        },
      });
    }
  }
}
