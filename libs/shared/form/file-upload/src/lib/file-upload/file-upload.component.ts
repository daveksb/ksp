import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpEventType } from '@angular/common/http';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatIconModule } from '@angular/material/icon';
import { getBase64 } from '@ksp/shared/utility';
import { RequestPageType } from '@ksp/shared/constant';
import { FileUploadService } from './file-upload.service';

@UntilDestroy()
@Component({
  selector: 'ksp-file-upload',
  standalone: true,
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  imports: [CommonModule, MatIconModule, HttpClientModule],
})
export class FileUploadComponent {
  @Input()
  requiredFileType!: string;

  @Input() buttonLabel = 'อัพโหลดไฟล์';
  @Input() systemFileName = '-'; // รายชื่ออ้างอิงในระบบ เช่น 'หนังสือนำส่งจากสถานศึกษา (ฉบับจริงและวันที่ออกหนังสือไม่เกิน 30 วัน)', 'รูปถ่าย 1 นิ้ว'
  @Input() pageType!: RequestPageType; // tab ที่เรียกใช้งาน
  @Input() showUploadedFileName = true;
  @Input() uniqueTimestamp = '';
  @Input() uploadType: 'button' | 'link' = 'button';
  @Output() uploadComplete = new EventEmitter<any>();

  fileName = '';
  uploadProgress!: number | null;

  constructor(private uploadService: FileUploadService) {}

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const base64 = (await getBase64(file)) as string;
    const payload = {
      pagetype: this.pageType,
      originalname: file.name,
      systemname: this.systemFileName,
      file: btoa(base64),
      uniquetimpstamp: this.uniqueTimestamp,
    };
    // file.text().then((res) => {
    //   const blob = new Blob([res], { type: file.type });
    //   const url = window.URL.createObjectURL(blob);
    //   window.URL.revokeObjectURL(url);
    //   // payload.file = btoa(encodeURIComponent(res));
    this.uploadFile(payload);
    // });

    if (file) {
      this.fileName = file.name;
    }
  }

  uploadFile(payload: any) {
    this.uploadService
      .uploadFile(payload)
      .pipe(untilDestroyed(this))
      .subscribe((event: any) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        }
        if (event.status == 200 && event.body?.id) {
          this.uploadComplete.emit({
            fileId: event.body.id,
            fileName: this.fileName,
          });
        }
      });
  }

  cancelUpload() {
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
  }
}
