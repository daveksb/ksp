import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { KspKuruspa, SelfLicense, University } from '@ksp/shared/interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SchoolLicenseService {
  constructor(private http: HttpClient) {}

  getStaffLicenses(payload: any): Observable<SelfLicense[]> {
    return this.http
      .post(`${environment.shortApiUrl}/selflicensesearch.php`, payload)
      .pipe(map((data: any) => data.datareturn));
  }

  searchKuruspaNo(kuruspano: string): Observable<KspKuruspa> {
    return this.http.post<KspKuruspa>(
      `${environment.apiUrl}/kspstaff/schkuruspano`,
      {
        kuruspano,
      }
    );
  }

  getUniversityList(): Observable<University[]> {
    return this.http
      .get<University[]>(`${environment.apiUrl}/kspmasterdata/uniuniversity`)
      .pipe(map((data: any) => data.datareturn));
  }
}
