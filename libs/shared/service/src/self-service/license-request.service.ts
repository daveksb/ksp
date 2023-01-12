import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import {
  KspPayment,
  KSPRequestSearchFilter,
  SelfGetRequest,
  SelfRequest,
} from '@ksp/shared/interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelfRequestService {
  constructor(private http: HttpClient) {}

  createRequest(form: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspself/ksprequestinsert`,
      form
    );
  }

  updateRequest(form: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspself/ksprequestupdate`,
      form
    );
  }

  cancelRequest(form: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspself/ksprequestinsertstatus`,
      form
    );
  }

  searchMyRequests(payload: KSPRequestSearchFilter): Observable<SelfRequest[]> {
    return this.http
      .post<SelfRequest[]>(
        `${environment.shortApiUrl}/ksprequestsearch_self.php`,
        payload
      )
      .pipe(map((data: any) => data.datareturn));
  }

  getRequestById(id: number): Observable<SelfGetRequest> {
    return this.http.post<SelfGetRequest>(
      `${environment.apiUrl}/kspself/ksprequestselectbyid`,
      {
        id: `${id}`,
      }
    );
  }

  createPayment(payload: KspPayment): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspself/ksppaymentinsert`,
      payload
    );
  }
}
