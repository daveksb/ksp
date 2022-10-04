import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { getCookie } from '@ksp/shared/utility';
import { lastValueFrom, map, Observable, shareReplay } from 'rxjs';
import _ from 'lodash';
@Injectable({
  providedIn: 'root',
})
export class UniInfoService {
  tokenKey = getCookie('userToken');
  constructor(private http: HttpClient) {}

  univerSitySelectById(id: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/kspuni/universityselectbyid`, {
      id,
      tokenkey: this.tokenKey,
    });
  }
  searchTypeidUniUniversity(id: any): Observable<any> {
    return this.http
      .get(
        `${environment.apiUrl}/kspmasterdata/searchtypeiduniuniversity?searchTypeId=${id}`
      )
      .pipe(map((res: any) => res?.datareturn));
  }

  uniRequestDegreeSearch(params: any): Observable<any> {
    return this.http
      .post(`${environment.shortApiUrl}/unirequestdegreecertsearch.php`, {
        ...params,
        tokenkey: this.tokenKey,
      })
      .pipe(
        map((res: any) => {
          return {
            ...res,
            datareturn: _.orderBy(res?.datareturn, ['requestdate'], 'desc'),
          };
        })
      );
  }

  uniRequestDegreeCertSelectById(id: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspuni/unirequestdegreecertselectbyid`,
      { id, tokenkey: this.tokenKey }
    );
  }
  getUniversity(typeId: any): Observable<any> {
    return this.http
      .get(
        `${environment.apiUrl}/kspmasterdata/searchtypeiduniuniversity?searchTypeId=${typeId}`
      )
      .pipe(
        map((data: any) => data.datareturn),
        shareReplay()
      );
  }

  getUniversityType(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/uniuniversitytype`)
      .pipe(
        map((data: any) => data.datareturn),
        shareReplay()
      );
  }

  searchUniversity(body: any): Observable<any> {
    return this.http
      .post(`${environment.shortApiUrl}/uniuniversitysearch.php`, body)
      .pipe(
        map((data: any) => data.datareturn),
        shareReplay()
      );
  }

  getOccupy() {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/unieduoccupy`)
      .pipe(
        map((data: any) => data.datareturn),
        shareReplay()
      );
  }

  uniDegreeLevel() {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/unidegreelevel`)
      .pipe(
        map((data: any) => data.datareturn),
        shareReplay()
      );
  }
  uniFieldOfStudy() {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/unifieldofstudy`)
      .pipe(
        map((data: any) => data.datareturn),
        shareReplay()
      );
  }
  uniMajor(id?: string) {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/unimajor?fieldofstudyid=${id}`)
      .pipe(
        map((data: any) => data.datareturn),
        shareReplay()
      );
  }

  uniSubject(id?: string) {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/unisubject?majorid=${id}`)
      .pipe(
        map((data: any) => data.datareturn),
        shareReplay()
      );
  }

  uniAcademicYear() {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/uniacademicyear`)
      .pipe(
        map((data: any) => data.datareturn),
        shareReplay()
      );
  }

  uniDegreeSearch(params: any): Observable<any> {
    return this.http
      .post(`${environment.shortApiUrl}/unidegreecertsearch.php`, {
        ...params,
        tokenkey: this.tokenKey,
      })
      .pipe(
        map((res: any) => {
          return {
            ...res,
            datareturn: _.orderBy(res?.datareturn, ['requestdate'], 'desc'),
          };
        })
      );
  }
  async getMajorAndBranch(row: any) {
    let major: any;
    let branch: any;
    if (row?.coursefieldofstudy)
      major = await lastValueFrom(
        this.uniMajor(row?.coursefieldofstudy).pipe(
          map((res) => {
            return _.find(res, { id: row?.coursemajor });
          })
        )
      );
    if (major?.id)
      branch = await lastValueFrom(
        this.uniSubject(major?.id).pipe(
          map((res) => {
            return _.find(res, { id: row?.coursesubjects });
          })
        )
      );
    return { major: major?.name || '-', branch: branch?.name || '-' };
  }

  uniDegreeCertSelectByid(id: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspuni/unidegreecertselectbyid`,
      {
        id,
        tokenkey: this.tokenKey,
      }
    );
  }

  searchSelfStudent(params: any): Observable<any> {
    return this.http.post(
      `${environment.shortApiUrl}/selfmyinfosearch_uni.php`,
      {
        ...params,
        tokenkey: this.tokenKey,
      }
    );
  }

  uniAdmissionSearch(params: any): Observable<any> {
    return this.http.post(
      `${environment.shortApiUrl}/unidegreeadmissionsearch.php`,
      {
        ...params,
        tokenkey: this.tokenKey,
      }
    );
  }

  uniAdmissionSearch2(params: any): Observable<any> {
    return this.http.post(
      `${environment.shortApiUrl}/unidegreeadmissionsearch_2.php`,
      {
        ...params,
        tokenkey: this.tokenKey,
      }
    );
  }

  uniRequestDegreeCertSelectUniDegreeCertId(
    unidegreecertid: any
  ): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspuni/unirequestdegreecertselectunidegreecertid`,
      {
        unidegreecertid,
        tokenkey: this.tokenKey,
      }
    );
  }

  uniDegreeHistory(params: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspuni/unirequestadmissionselectadid`,
      {
        ...params,
        tokenkey: this.tokenKey,
      }
    );
  }
  
  uniRequestEditHistory(params: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspuni/unirequestadmissionjoinksprequestprocessselect`,
      {
        ...params,
        tokenkey: this.tokenKey,
      }
    );
  }
}
