import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { getCookie } from '@ksp/shared/utility';
import { Observable } from 'rxjs';
export type UniRequestInsertType = {
  requestprocess?: string | null;
  requeststatus?: string | null;
  systemtype?: string | null;
  requesttype?: string | null;
  subtype?: string | null;
  unitype?: string | null;
  uniname?: string | null;
  unicode?: string | null;
  uniprovince?: string | null;
  degreelevel?: string | null;
  courseacademicyear?: string | null;
  coursename?: string | null;
  coursetype?: string | null;
  coursestatus?: string | null;
  coursemajor?: string | null;
  coursefieldofstudy?: string | null;
  coursesubjects?: string | null;
  fulldegreenameth?: string | null;
  fulldegreenameen?: string | null;
  shortdegreenameth?: string | null;
  shortdegreenameen?: string | null;
  courseapprovetime?: string | null;
  courseapprovedate?: Date | null;
  courseacceptdate?: Date | null;
  coursedetailtype?: string | null;
  coursedetailinfo?: string | null;
  teachinglocation?: string | null;
  responsibleunit?: string | null;
  evaluatelocation?: string | null;
  coordinatorinfo?: string | null;
  coursestructure?: string | null;
  courseplan?: string | null;
  courseteacher?: string | null;
  courseinstructor?: string | null;
  courseadvisor?: string | null;
  processtrainning?: string | null;
  processteaching?: string | null;
  attachfiles?: string | null;
  checkresult?: string | null;
  considerresult?: string | null;
  approveresult?: string | null;
  degreeapprovecode?: string | null;
  uniid?: string | null;
  ref1?: string | null;
  ref2?: string | null;
  ref3?: string | null;
  tokenkey?: string | null;
};
@Injectable({
  providedIn: 'root',
})
export class DegreeCertRequestService {
  constructor(private http: HttpClient) {}
  universitySelectById(id: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/kspuni/universityselectbyid`, {
      id,
      tokenkey: getCookie('userToken'),
    });
  }
  uniRequestInsert(params: UniRequestInsertType): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspuni/unirequestinsert`,
      params
    );
  }
}
