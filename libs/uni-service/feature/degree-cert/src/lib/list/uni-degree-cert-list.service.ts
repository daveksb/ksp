import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { getCookie } from '@ksp/shared/utility';
import { Observable } from 'rxjs';
export type UniRequestDegreeSearchType = {
  uniid?: any;
  fulldegreenameth?: any;
  requestno?: any;
};
@Injectable({
  providedIn: 'root',
})
export class UniDegreeCertListService {
  constructor(private http: HttpClient) {}
  uniRequestDegreeSearch(params: UniRequestDegreeSearchType): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspuni/unirequestdegreesearch`,
      { ...params, tokenkey: getCookie('userToken') }
    );
  }
  universitySelectById(id: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/kspuni/universityselectbyid`, {
      id,
      tokenkey: getCookie('userToken'),
    });
  }
}
