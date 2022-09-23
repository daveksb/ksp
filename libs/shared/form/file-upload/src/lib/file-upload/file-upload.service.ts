import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  uploadFile(payload: any) {
    return this.http.post(
      `${environment.apiUrl}/kspstaff/schrequestfileinsert`,
      payload,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
    //.pipe(finalize(() => this.reset()));
  }

  deleteFile(payload: any) {
    return this.http.post(
      `${environment.apiUrl}/kspstaff/schrequestfiledelete`,
      payload
    );
  }

  downloadFile(payload: any) {
    return this.http.post(
      `${environment.apiUrl}/kspstaff/schrequestfileselectbyid`,
      payload
    );
  }
}
