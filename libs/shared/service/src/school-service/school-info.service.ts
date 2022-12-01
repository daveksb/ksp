import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { SchInfo, SchUser } from '@ksp/shared/interface';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SchoolInfoService {
  constructor(private http: HttpClient) {}

  getSchoolInfo(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspstaff/schschoolsearchschoolid`,
      payload
    );
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

  searchSchool(payload: any): Observable<SchInfo[]> {
    return this.http
      .post(`https://kspapi.oceanicnetwork.net/schschoolsearch.php`, payload)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }

  searchSchUsers(payload: any): Observable<SchUser[]> {
    return this.http
      .post(`${environment.apiUrl}/ksppublic/schuserselect`, payload)
      .pipe(map((data: any) => data.datareturn));
  }

  getCoordinatorInfo(payload: any): Observable<any> {
    return this.http
      .post(`https://kspapi.oceanicnetwork.net/schuser_ksprequest.php`, payload)
      .pipe(map((data: any) => data.datareturn));
  }
}
