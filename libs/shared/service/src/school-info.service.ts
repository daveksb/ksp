import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SchoolInfoService {
  constructor(private http: HttpClient) {}

  getSchoolInfo(schoolId: string): Observable<any> {
    return this.http
      .get(
        `${environment.apiUrl}/kspschoolregister/schschoolsearchschoolid?schoolId=${schoolId}`
      )
      .pipe(shareReplay());
  }

  /*   addTempLicense(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspschoolregister/schtmplicencerequestinsert`,
      payload
    );
  } */

  getSchoolEduOccupy(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/schooleduoccupy`)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }
}
