import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { getCookie } from '@ksp/shared/utility';
import _ from 'lodash';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EUniService {
  constructor(private http: HttpClient) {}
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
      `${environment.apiUrl}e-service/unidegreecertinsert`,
      { ...payload, tokenkey: getCookie('userToken') }
    );
  }
}
