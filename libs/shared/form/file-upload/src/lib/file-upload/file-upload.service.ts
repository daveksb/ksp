import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { getCookie } from '@ksp/shared/utility';

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
  tokenKey = getCookie('userToken');
  constructor(
    private http: HttpClient,
    @Inject(File_UPLOAD_URLS) private apiURL: FileUploadUrls
  ) {}

  uploadFile(payload: any) {
    let param = {};
    if (payload.requesttype && (payload.requesttype != 1 && payload.requesttype != 2)) {
      param = {
        ...payload,
        tokenkey: this.tokenKey
      }
    } else {
      param = {
        ...payload
      }
    }
    return this.http.post(
      `${environment.apiUrl}${this.apiURL.uploadFile}`,
      param,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }

  deleteFile(payload: any) {
    let param = {};
    if (payload.requesttype && (payload.requesttype != 1 && payload.requesttype != 2)) {
      param = {
        ...payload,
        tokenkey: this.tokenKey
      }
    } else {
      param = {
        ...payload
      }
    }
    return this.http.post(
      `${environment.apiUrl}${this.apiURL.delete}`,
      param
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
