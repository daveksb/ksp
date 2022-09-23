import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { environment } from '@ksp/shared/environment';

export interface FileUploadUrls {
  upload: string;
  download: string;
  delete: string;
}

export const API_URL = new InjectionToken<FileUploadUrls>('');
@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiURL: FileUploadUrls
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
