import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import {
  KspRequest,
  KspRequestProcess,
  SchRequestSearchFilter,
  SchTempLicense,
} from '@ksp/shared/interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SchoolRequestService {
  constructor(private http: HttpClient) {}

  getTempLicense(id: string | null): Observable<SchTempLicense> {
    return this.http.post<SchTempLicense>(
      `${environment.apiUrl}/kspstaff/ksprequestselectbyid`,
      {
        id,
      }
    );
  }

  getTempLicenseHistory(idcardno: string | null): Observable<SchTempLicense[]> {
    return this.http
      .post<SchTempLicense[]>(
        `${environment.apiUrl}/kspstaff/schtemplicenseselectidcardno`,
        {
          idcardno,
        }
      )
      .pipe(map((data: any) => data.datareturn));
  }

  schSearchRequest(payload: SchRequestSearchFilter): Observable<KspRequest[]> {
    return this.http
      .post<KspRequest[]>(
        `${environment.shortApiUrl}/ksprequestsearch_school.php`,
        payload
      )
      .pipe(map((data: any) => data.datareturn));
  }

  schCreateRequest(payload: Partial<KspRequest>): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspstaff/ksprequestinsert`,
      payload
    );
  }

  schGetRequestById(id: number): Observable<KspRequest> {
    const payload = {
      id: `${id}`,
    };
    return this.http.post<KspRequest>(
      `${environment.apiUrl}/kspstaff/ksprequestselectbyid`,
      payload
    );
  }

  schUpdateRequest(payload: KspRequest): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspstaff/ksprequestupdate`,
      payload
    );
  }

  schUpdateRequestProcess(payload: KspRequestProcess): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspstaff/ksprequestinsertstatus`,
      payload
    );
  }

  schCloseRequest(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspstaff/ksprequestupdateisclose`,
      payload
    );
  }
}
