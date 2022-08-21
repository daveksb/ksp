import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaffPersonInfoService {
  private serviceUrl = 'http://38.242.138.3/ksp/kspmasterdata';

  constructor(private http: HttpClient) {}

  addStaff(): Observable<any> {
    return this.http.post(this.serviceUrl, {});
  }

  /* getUsers(): Observable<User[]> {
    return this.http
      .get(this.serviceUrl)
      .pipe<User[]>(map((data: any) => data.users));
  }
 */
}
