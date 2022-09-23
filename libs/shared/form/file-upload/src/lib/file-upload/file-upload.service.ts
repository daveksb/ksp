import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { environment } from '@ksp/shared/environment';

export interface FileUploadUrls {
  upload: string;
  download: string;
  delete: string;
}

export const File_UPLOAD_URLS = new InjectionToken<FileUploadUrls>('');
@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(
    private http: HttpClient,
    @Inject(File_UPLOAD_URLS) private apiURL: FileUploadUrls
  ) {}

  uploadFile(payload: any) {
    return this.http.post(
      `${environment.apiUrl}${this.apiURL.upload}`,
      payload,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }

  deleteFile(payload: any) {
    return this.http.post(
      `${environment.apiUrl}${this.apiURL.delete}`,
      payload
    );
  }

  downloadFile(payload: any) {
    return this.http.post(
      `${environment.apiUrl}${this.apiURL.download}`,
      payload
    );
  }
}
