import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { KspListResponse, SchoolUser } from '@ksp/shared/interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ESchStaffService {
  constructor(private http: HttpClient) {}

  SearchSchStaffs(payload: any): Observable<SchoolUser[]> {
    return this.http
      .post<KspListResponse>(
        `${environment.shortApiUrl}/schusersearch.php`,
        payload
      )
      .pipe(map((data) => data.datareturn));
  }
}
