import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { getCookie } from '@ksp/shared/utility';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UniInfoService {
  constructor(private http: HttpClient) {}

  univerSitySelectById(id: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/kspuni/universityselectbyid`, {
      id,
      tokenkey: getCookie('userToken'),
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
    return this.http.post(
      `${environment.apiUrl}/kspuni/unirequestdegreesearch`,
      { ...params, tokenkey: getCookie('userToken') }
    );
  }

}
