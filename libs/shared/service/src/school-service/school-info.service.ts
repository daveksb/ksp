import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { SchoolInfo } from '@ksp/shared/interface';
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

  getSchoolEduOccupy(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/schooleduoccupy`)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }

  getOsoiTypes(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/schoolrewardtype`)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }

  getPersonTypes(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/schoolpersontype`)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }

  searchSchool(payload: any): Observable<SchoolInfo[]> {
    return this.http
      .post(`https://kspapi.oceanicnetwork.net/schschoolsearch.php`, payload)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }

  searchUserLogin(payload: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/ksppublic/schuserselect`, payload)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }
}
