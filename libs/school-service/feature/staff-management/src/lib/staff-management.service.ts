import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaffManagementService {
  private serviceUrl = 'https://kspapi.oceanicnetwork.net/ksp';

  token =
    'abcdjbtswWVuiFxOlK4aHOK6AvcDlK6bBfCnQEHvanYkhuWAWQS6WQx6n4uVmZTxCYi4JEJ9ysLo2h6WLvjHaeHpAx2C3bt3LGjq';

  constructor(private http: HttpClient) {}

  getStaffs(schoolId: string): Observable<any> {
    //https://kspapi.oceanicnetwork.net/ksp/kspschoolregister/schstaffall?schoolId=14&tokenkey=frrrjbtswWVuiFxOlK4aHOK6AvcDlK6bBfCnQEHvanYkhuWAWQS6WQx6n4uVmZTxCYi4JEJ9ysLo2h6WLvjHaeHpAx2C3bt3LGjq
    return this.http
      .get(
        `${this.serviceUrl}/kspschoolregister/schstaffall?schoolId=${schoolId}&tokenkey=${this.token}`
      )
      .pipe(map((data: any) => data.datareturn));
  }
}
