import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneralInfoService {
  constructor(private http: HttpClient) {}

  getPrefix(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/kspmasterdata/nameprefix`).pipe(
      map((data: any) => data.datareturn),
      shareReplay()
    );
  }

  getVisaType(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/kspmasterdata/visatype`).pipe(
      map((data: any) => data.datareturn),
      shareReplay()
    );
  }

  getVisaClass(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/kspmasterdata/visaclass`).pipe(
      map((data: any) => data.datareturn),
      shareReplay()
    );
  }

  getNationality(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/nationality`)
      .pipe(
        map((data: any) => data.datareturn),
        shareReplay()
      );
  }

  getBureau(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/kspmasterdata/bureau`).pipe(
      map((data: any) => data.datareturn),
      shareReplay()
    );
  }

  getUniversity(typeId: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/kspmasterdata/searchtypeiduniuniversity?searchTypeId=${typeId}`).pipe(
      map((data: any) => data.datareturn),
      shareReplay()
    );
  }

  getUniversityType(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/kspmasterdata/uniuniversitytype`).pipe(
      map((data: any) => data.datareturn),
      shareReplay()
    );
  }

  searchUniversity(body: any): Observable<any> {
    return this.http.post(`${environment.apiUrlNoAuth}/uniuniversitysearch.php`, body).pipe(
      map((data: any) => data.datareturn),
      shareReplay()
    );
  }

  getOccupy() {
    return this.http.get(`${environment.apiUrl}/kspmasterdata/unieduoccupy`).pipe(
      map((data: any) => data.datareturn),
      shareReplay()
    );
  }
}
