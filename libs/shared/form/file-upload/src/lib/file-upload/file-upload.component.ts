import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpEventType,
} from '@angular/common/http';
import { finalize, Subscription } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatIconModule } from '@angular/material/icon';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { getCookie, providerFactory } from '@ksp/shared/utility';
import { environment } from '@ksp/shared/environment';
import { FileUploadService } from './file-upload.service';

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

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('thumbnail', file);

      const payload = {
        pagetype: 'file-upload-tap',
        originalname: file.name,
        systemname:
          'หนังสือนำส่งจากสถานศึกษา (ฉบับจริงและวันที่ออกหนังสือไม่เกิน 30 วัน)',
        file: file.stream(),
        uniquetimpstamp: new Date().getTime(),
      };

      this.uploadService
        .uploadFile(payload)
        .pipe(untilDestroyed(this))
        .subscribe((event: any) => {
          if (event.type == HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(
              100 * (event.loaded / event.total)
            );
          }

          this.uploadComplete.emit(file.name);
        });
    }
  }

  cancelUpload() {
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
  }
}
