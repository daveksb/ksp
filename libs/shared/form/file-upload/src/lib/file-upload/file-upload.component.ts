import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpEventType } from '@angular/common/http';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatIconModule } from '@angular/material/icon';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
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
  @Input() systemFileName = '';
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

    /*
    {
  "pagetype" : "ทดสอบ3",
  "originalname" : "ทดสอบ3",
  "systemname" : "ทดสอบ4",
  "file" : "ZQ==",
  "uniquetimpstamp" : "abcd5444",
  "tokenkey" : "abcdjbtswWVuiFxOlK4aHOK6AvcDlK6bBfCnQEHvanYkhuWAWQS6WQx6n4uVmZTxCYi4JEJ9ysLo2h6WLvjHaeHpAx2C3bt3LGjq"
}
    */

    const payload = {
      pagetype: 'file-upload-tap-2',
      originalname: file.name,
      systemname: this.systemFileName,
      file: 'ZQ==',
      uniquetimpstamp: `${new Date().getTime()}`,
    };

    this.uploadService
      .uploadFile(payload)
      .pipe(untilDestroyed(this))
      .subscribe((event: any) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        }
        this.uploadComplete.emit(file.name);
      });

    /*     file.text().then((res) => {
      console.log('res = ', res);
    }); */

    if (file) {
      this.fileName = file.name;
    }
  }

  cancelUpload() {
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
  }
}
