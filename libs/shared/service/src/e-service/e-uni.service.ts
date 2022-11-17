import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { EsSearchPayload, KspRequest } from '@ksp/shared/interface';
import { getCookie } from '@ksp/shared/utility';
import _ from 'lodash';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EUniService {
  constructor(private http: HttpClient) {}

  getUniDegreeCertById(id: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/unidegreecertselectbyid`,
      {
        id: id,
        tokenkey: getCookie('userToken'),
      }
    );
  }

  getAdmissionCount(form: any): Observable<any> {
    return this.http.post(
      `${environment.shortApiUrl}/unirequestadmissioncount_es.php`,
      {
        ...form,
        tokenkey: getCookie('userToken'),
      }
    );
  }

  getAdmissionListById(form: any): Observable<any> {
    return this.http.post(
      `${environment.shortApiUrl}/unirequestadmissionsearch_es.php`,
      {
        ...form,
        tokenkey: getCookie('userToken'),
      }
    );
  }

  getGraduateListById(form: any): Observable<any> {
    return this.http.post(
      `${environment.shortApiUrl}/unidegreeadmissionsearchall_es.php`,
      {
        ...form,
        tokenkey: getCookie('userToken'),
      }
    );
  }

  requestProcessInsert(form: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/ksprequestprocessinsert_unirequestadmission`,
      {
        ...form,
        tokenkey: getCookie('userToken'),
      }
    );
  }

  insertStudent(form: any): Observable<any> {
    return this.http.post(
      `${environment.shortApiUrl}/unidegreeadmissioninsertarray.php`,
      {
        ...form,
        tokenkey: getCookie('userToken'),
      }
    );
  }

  updateStudent(form: any): Observable<any> {
    return this.http.post(
      `${environment.shortApiUrl}/unidegreeadmissionupdatearray.php`,
      {
        ...form,
        tokenkey: getCookie('userToken'),
      }
    );
  }

  getProcessHistory(form: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/ksprequestprocessselectbyrequestid_requestadmission`,
      {
        ...form,
        tokenkey: getCookie('userToken'),
      }
    );
  }

  getDegreeCertList(form: any): Observable<any> {
    return this.http.post(
      `${environment.shortApiUrl}/unidegreecertsearch_es.php`,
      {
        ...form,
        tokenkey: getCookie('userToken'),
      }
    );
  }
  uniRequestDegreeCertSearchEsUni(params: any): Observable<any> {
    return this.http.post(
      `${environment.shortApiUrl}/unirequestdegreecertsearch_es_uni.php`,
      {
        ...params,
        tokenkey: getCookie('userToken'),
      }
    );
  }
  uniRequestDegreeCertSelectById(id: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/unirequestdegreecertselectbyid`,
      { id, tokenkey: getCookie('userToken') }
    );
  }
  uniDegreeCertInsert(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/unidegreecertinsert`,
      { ...payload, tokenkey: getCookie('userToken') }
    );
  }

  uniDegreeGraduateHistory(params: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/unirequestadmissionselectbyunidegreecertid`,
      {
        ...params,
        tokenkey: getCookie('userToken'),
      }
    );
  }

  insertUniExamResult(data: any): Observable<any> {
    return this.http.post(
      `${environment.shortApiUrl}/insertuniexamresult.php`,
      {
        data,
        tokenkey: getCookie('userToken'),
      }
    );
  }
  getUserlistbyUniid(params: any): Observable<any> {
    return this.http.post(
      `${environment.shortApiUrl}/uniusersearch_uniid_es.php`,
      {
        ...params,
        tokenkey: getCookie('userToken'),
      }
    );
  }

  uniExamResultSearchEs(search: any): Observable<any> {
    return this.http.post(
      `${environment.shortApiUrl}/uniexamresultsearch_es.php`,
      {
        ...search,
        tokenkey: getCookie('userToken'),
      }
    );
  }
  getUserById(params: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/e-service/uniuserselectbyid`, {
      ...params,
      tokenkey: getCookie('userToken'),
    });
  }
  
  getUniExamCourse(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/kspmasterdata/uniexamcourse`);
  }

  insertUniExamInfo(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/e-service/uniexaminfoinsert`, {
      ...data,
      tokenkey: getCookie('userToken'),
    });
  }

  getDegreeCertResultList(params: any): Observable<any> {
    return this.http.post(
      `${environment.shortApiUrl}/uniperformanceresult_unidegreecert.php`,
      {
        ...params,
        tokenkey: getCookie('userToken'),
      }
    );
  }

  insertUniPerformanceResult(data: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/uniperformanceresultinsert`,
      {
        ...data,
        tokenkey: getCookie('userToken'),
      }
    );
  }

  KspSearchUniRequest(params: any): Observable<any> {
    return this.http.post(
      `${environment.shortApiUrl}/ksprequestjoinuniversitysearch_es.php`,
      {
        ...params,
        tokenkey: getCookie('userToken'),
      }
    );
  }
}
