import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TempLicenseService {
  constructor(private http: HttpClient) {}

  searchIdCard(schoolId: string, idCard: string): Observable<any> {
    return this.http
      .get(
        `${environment.apiUrl}/kspschoolregister/schstaffsearchidcardno?idCardNo=${idCard}&schoolId=${schoolId}&tokenkey=${environment.token}`
      )
      .pipe(shareReplay());
  }

  getSchoolInfo(schoolId: string) {
    //https://kspapi.oceanicnetwork.net/ksp/kspschoolregister/schschoolsearchschoolid?schoolId=1064020154&tokenkey=abcdjbtswWVuiFxOlK4aHOK6AvcDlK6bBfCnQEHvanYkhuWAWQS6WQx6n4uVmZTxCYi4JEJ9ysLo2h6WLvjHaeHpAx2C3bt3LGjq
    //https://kspapi.oceanicnetwork.net/ksp/kspschoolregister/schtmplicencerequestinsert
    return this.http
      .get(
        `${environment.apiUrl}/kspschoolregister/schschoolsearchschoolid?schoolId=${schoolId}&tokenkey=${environment.token}`
      )
      .pipe(shareReplay());
  }

  addTempLicense(payload: any): Observable<any> {
    return this.http.post(
      //schtmplicencerequestinsert
      `${environment.apiUrl}/kspschoolregister/schtmplicencerequestinsert`,
      {
        ...payload,
        tokenkey: environment.token,
      }
    );
  }
}
