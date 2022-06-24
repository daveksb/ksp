import { Component, Input } from '@angular/core';
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
import { providerFactory } from '@ksp/shared/utility';

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

  fileName = '';
  uploadProgress!: number | null;
  uploadSub!: Subscription | null;

  constructor(private http: HttpClient) {
    super();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('thumbnail', file);

      const upload$ = this.http
        .post('/api/test-endpoint', formData, {
          reportProgress: true,
          observe: 'events',
        })
        .pipe(finalize(() => this.reset()));

      upload$.pipe(untilDestroyed(this)).subscribe((event: any) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        }
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
