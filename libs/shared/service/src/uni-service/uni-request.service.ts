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
  saveRequestInsert(form: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/kspuni/requestinsert`, {
      ...form,
      tokenkey: getCookie('userToken'),
    });
  }
}
