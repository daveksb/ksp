import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpEventType } from '@angular/common/http';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatIconModule } from '@angular/material/icon';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { FileUploadService } from './file-upload.service';
import { RequestPageType } from '@ksp/shared/constant';

@UntilDestroy()
@Component({
  selector: 'ksp-file-upload',
  standalone: true,
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  imports: [CommonModule, MatIconModule, HttpClientModule],
  providers: providerFactory(FileUploadComponent),
})
export class FileUploadComponent extends KspFormBaseComponent {
  @Input()
  requiredFileType!: string;

  @Input() buttonLabel = 'อัพโหลดไฟล์';
  @Input() systemFileName = '-'; // รายชื่ออ้างอิงในระบบ เช่น 'หนังสือนำส่งจากสถานศึกษา (ฉบับจริงและวันที่ออกหนังสือไม่เกิน 30 วัน)', 'รูปถ่าย 1 นิ้ว'
  @Input() pageType!: RequestPageType; // tab ที่เรียกใช้งาน
  @Input() showUploadedFileName = true;
  @Input() uploadType: 'button' | 'link' = 'button';
  @Output() uploadComplete = new EventEmitter<string>();

  fileName = '';
  uploadProgress!: number | null;

  constructor(private uploadService: FileUploadService) {
    super();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    const payload = {
      pagetype: this.pageType,
      originalname: file.name,
      systemname: this.systemFileName,
      file: '',
      uniquetimpstamp: `${new Date().getTime()}`,
    };

    file.text().then((res) => {
      payload.file = btoa(unescape(encodeURIComponent(res)));
      this.uploadFile(payload);
    });

    if (file) {
      this.fileName = file.name;
    }

    this.uploadComplete.emit(file.name);
  }

  uploadFile(payload: any) {
    this.uploadService
      .uploadFile(payload)
      .pipe(untilDestroyed(this))
      .subscribe((event: any) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
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
