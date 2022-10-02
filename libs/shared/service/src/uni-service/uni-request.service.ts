import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { getCookie } from '@ksp/shared/utility';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UniRequestService {
  constructor(private http: HttpClient) {}

  createRequest(form: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/kspuni/requestinsert`, form);
  }

  saveRequestInsert(form: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/kspuni/requestinsert`, {
      ...form,
      tokenkey: getCookie('userToken'),
    });
  }
  uniRequestInsert(params: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspuni/unirequestinsert`,
      params
    );
  }
  uniRequestUpdate(params: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspuni/unirequestupdate`,
      params
    );
  }
  searchUniRequest(form: any): Observable<any> {
    return this.http.post(`${environment.shortApiUrl}/uniusersearch.php`, {
      ...form,
      tokenkey: getCookie('userToken'),
    });
  }

  getUniDegreeCertById(id: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspuni/unidegreecertselectbyid`, {
        id: id,
        tokenkey: getCookie('userToken'),
      }
    );
  }

  searchUniDegreeCert(form: any): Observable<any> {
    return this.http.post(`${environment.shortApiUrl}/unidegreecertsearch.php`, {
      ...form,
      tokenkey: getCookie('userToken'),
    });
  }

  createRequestAdmission(form: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/kspuni/unirequestadmissioninsertupdate`, {
      ...form,
      tokenkey: getCookie('userToken'),
    });
  }
}
