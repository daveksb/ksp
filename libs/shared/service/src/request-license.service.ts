import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestLicenseService {
  constructor(private http: HttpClient) {}

  requestLicense(form: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/kspstaff/schrequestinsert`, form)
      .pipe(shareReplay());
  }
  getSchoolInfo(schoolId: string, tokenkey: string) {
    return this.http
      .get(
        `${environment.apiUrl}/kspschoolregister/schschoolsearchschoolid?schoolId=${schoolId}&tokenkey=${tokenkey}`
      )
      .pipe(shareReplay());
  }
}
