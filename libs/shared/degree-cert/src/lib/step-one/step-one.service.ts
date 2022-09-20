import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import {
  CourseFormFourComponent,
  CourseFormOneComponent,
  CourseFormThreeComponent,
  CourseFormTwoComponent,
} from '@ksp/shared/form/uni-course-form';
import { ListData } from '@ksp/shared/interface';
import { lastValueFrom, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class DegreeCertStepOneService {
  constructor(private http: HttpClient) {}
  componentList = [
    CourseFormOneComponent,
    CourseFormThreeComponent,
    CourseFormFourComponent,
    CourseFormTwoComponent,
  ];

  degreeTypes: ListData[] = [
    {
      value: 0,
      label: 'ปริญญาตรีทางการศึกษา (หลักสูตร 4 ปี)',
    },
    {
      value: 1,
      label: 'ปริญญาตรีทางการศึกษา (หลักสูตร 5 ปี)',
    },
    {
      value: 2,
      label: 'ประกาศนียบัตรบัณฑิตทางการศึกษา (วิชาชีพครู)',
    },
    {
      value: 3,
      label: 'ประกาศนียบัตรบัณฑิตทางการศึกษา (วิชาชีพบริหาร)',
    },
    {
      value: 4,
      label: 'ปริญญาโททางการศึกษา (วิชาชีพครู)',
    },
    {
      value: 5,
      label: 'ปริญญาโททางการศึกษา (วิชาชีพบริหาร)',
    },
    {
      value: 6,
      label: 'ปริญญาเอกทางการศึกษา (วิชาชีพครู)',
    },
    {
      value: 7,
      label: 'ปริญญาเอกทางการศึกษา (วิชาชีพบริหาร)',
    },
  ];

  courseTypes: ListData[] = [
    {
      value: 0,
      label: 'เอกเดี่ยว กรณีไม่มีการกำหนดวิชาเอก หรือแขนงวิชาย่อย',
    },
    {
      value: 1,
      label: 'เอกเดี่ยว กรณีมีการกำหนดวิชาเอก หรือแขนงวิชาย่อย',
    },
    {
      value: 2,
      label: 'เอกคู่',
    },
    {
      value: 3,
      label: 'เอก-โท',
    },
  ];
  mapListData(data: any) {
    return data?.datareturn?.map(({ id, name }: any) => ({
      value: id,
      label: name,
    }));
  }
  getUniversityType(): Observable<ListData[]> {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/uniuniversitytype`)
      .pipe(map(this.mapListData));
  }
  searchNameUniUniversity(searchName?: string): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/kspmasterdata/searchnameuniuniversity?searchName=${searchName}`
    );
  }

  getProvince(): Observable<ListData[]> {
    return this.http.get(`${environment.apiUrl}/kspmasterdata/province`).pipe(
      map(({ datareturn }: any) => {
        return datareturn?.map(({ province_id, province_name }: any) => ({
          value: province_id,
          label: province_name,
        }));
      })
    );
  }

  getUniDegreelevel(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/unidegreelevel`)
      .pipe(map(this.mapListData));

  }

  getUniCourseType(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/unicoursetype`)
      .pipe(map(this.mapListData));

  }

  getNamePrefix(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/kspmasterdata/nameprefix`);
  }
}
