import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LicenseRequestService {
  constructor(private http: HttpClient) {}

  requestLicense(form: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/kspself/requestinsert`, form);
  }
}
