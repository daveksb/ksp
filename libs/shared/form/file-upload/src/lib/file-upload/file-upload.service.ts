import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { environment } from '@ksp/shared/environment';

export interface FileUploadUrls {
  uploadFile: string;
  uploadImage: string;
  update?: string;
  download: string;
  delete: string;
}

export const File_UPLOAD_URLS = new InjectionToken<FileUploadUrls>('');
@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(
    private http: HttpClient,
    @Inject(File_UPLOAD_URLS) private apiURL: FileUploadUrls
  ) {}

  uploadFile(payload: any) {
    console.log(this.apiURL);
    return this.http.post(
      `${environment.apiUrl}${this.apiURL.uploadFile}`,
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

  uploadImage(payload: any) {
    return this.http.post(
      `${environment.apiUrl}${this.apiURL.uploadImage}`,
      payload,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }
}
