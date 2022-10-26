import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelfDevelopService {
  constructor(private http: HttpClient) {}

  addSelfDevelop(payload: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/kspstaff/schselfdevelopinsert`, payload)
      .pipe(map((data: any) => data.datareturn));
  }
}
