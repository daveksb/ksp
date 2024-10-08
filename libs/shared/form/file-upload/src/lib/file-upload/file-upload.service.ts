import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { environment } from '@ksp/shared/environment';

export interface FileUrls {
  uploadFile: string;
  uploadImage: string;
  update?: string;
  download: string;
  delete: string;
}

export const File_UPLOAD_URLS = new InjectionToken<FileUrls>('');
@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(
    private http: HttpClient,
    @Inject(File_UPLOAD_URLS) private apiURL: FileUrls
  ) {}

  uploadFile(payload: any) {
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

  eDownloadSchoolFile(payload: any) {
    return this.http.post(
      `${environment.apiUrl}/e-service/schrequestfileselectbyid`,
      payload
    );
  }

  eDownloadEUniFile(payload: any) {
    return this.http.post(
      `${environment.apiUrl}/e-service/unirequestfileselectbyid`,
      payload
    );
  }

  downloadUniFile(payload: any) {
    return this.http.post(
      `${environment.apiUrl}/kspuni/unirequestfileselectfile`,
      payload
    );
  }

  eDownloadKspFile(payload: any) {
    return this.http.post(
      `${environment.apiUrl}/e-service/kspfileselectidfile`,
      payload
    );
  }
}
