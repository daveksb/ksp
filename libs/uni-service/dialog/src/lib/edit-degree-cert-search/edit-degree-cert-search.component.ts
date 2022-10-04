import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { KspPaginationComponent, ListData } from '@ksp/shared/interface';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UniInfoService, AddressService } from '@ksp/shared/service';
import { map } from 'rxjs';
import _ from 'lodash';
import moment from 'moment';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
const mapOption = () =>
  map((data: any) => {
    return (
      data?.map((data: any) => ({
        label: _.get(data, 'name'),
        value: _.get(data, 'id'),
      })) || []
    );
  });
@Component({
  selector: 'uni-service-edit-degree-cert-search',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatPaginatorModule ,ReactiveFormsModule],
  templateUrl: './edit-degree-cert-search.component.html',
  styleUrls: ['./edit-degree-cert-search.component.scss'],
})
export class EditDegreeCertSearchComponent
  extends KspPaginationComponent
  implements OnInit
{
 
  degreeLevelOptions: ListData[] = [];
  fieldOfStudyOptions: ListData[] = [];
  majorOptions: ListData[] = [];
  subjectOptions: ListData[] = [];
  academicYearOptions: ListData[] = [];
  provinces: ListData[] = [];
  universityType: ListData[] = [];
  universities: ListData[] = [];
  selectedUniversity = '';
  dataSource: University[] = [];
  form = this.fb.group({
    degreeCode: [],
    degreeName: [],
    degreeLevel: [],
    major: [],
    subject: [],
    year: [],
    fieldOfStudy:[],
    province: [],
  });

  ngOnInit(): void {
    this.getAll()
  }

  constructor(
    private router: Router,
    private uniInfoService: UniInfoService,
    private addressService: AddressService,
    private fb:FormBuilder
  ) {
    super();
  }

  onItemChange(universityCode: string) {
    this.selectedUniversity = universityCode;
    //console.log('universityCode = ', universityCode);
  }

  override search() {
    const value: any = this.form.value;
    const payload = {
      fulldegreenameth: value?.degreeName || '',
      degreelevel: value?.degreeLevel || '',
      courseacademicyear: value?.year || '',
      degreeapprovecode: value?.degreeCode || '',
      coursefieldofstudy: value?.fieldOfStudy || '',
      coursemajor: value?.major || '',
      coursesubjects: value?.subject || '',
      uniprovince: value?.province || '',
      ...this.tableRecord
    };
    this.uniInfoService.uniDegreeSearch(payload).subscribe(async (res) => {
      const newData: any = [];
      this.pageEvent.length = res.countrow
      for (const row of res?.datareturn || []) {
        const degreeLevel = this._findOptions(
          this.degreeLevelOptions,
          row?.degreelevel
        );
       
        const { major, branch } = await this.uniInfoService.getMajorAndBranch(
          row
        );
        newData.push({
          key: row?.id,
          approveCode: row?.degreeapprovecode || '-',
          degreeLevel,
          major,
          branch,
          university: row?.uniname || '-',
          degreeName: row?.fulldegreenameth || '-',
        });
      }
      this.dataSource = newData;
    });
  }
  private _findOptions(dataSource: any, key: any) {
    return _.find(dataSource, { value: key })?.label || '-';
  }
  clear() {
    this.form.reset()
    this.clearPageEvent();
    this.dataSource = [];
  }

  confirm() {
    this.router.navigate(['/edit-degree-cert', 'detail'], {
      queryParams: {
        id: this.selectedUniversity,
      },
    });
  }
  onSelectChange(e: any, key: any):any {
    const value = e.target.value
    if (key === 'fieldOfStudy') {
      return this.uniInfoService
        .uniMajor(value)
        .pipe(mapOption())
        .subscribe((res) => {
          this.majorOptions = res;
        });
    }

    if (key === 'major') {
      return this.uniInfoService
        .uniSubject(value)
        .pipe(mapOption())
        .subscribe((res) => {
          this.subjectOptions = res;
        });
    }

    if (key === 'universityType') {
      return this.uniInfoService
        .getUniversity(value)
        .pipe(mapOption())
        .subscribe((res) => {
          this.universities = res;
        });
    }
  }
  getAll() {
    this.uniInfoService
      .getUniversityType()
      .pipe(mapOption())
      .subscribe((res) => {
        this.universityType = res;
      });

    this.uniInfoService
      .uniDegreeLevel()
      .pipe(mapOption())
      .subscribe((res) => {
        this.degreeLevelOptions = res;
      });

    this.uniInfoService
      .uniFieldOfStudy()
      .pipe(mapOption())
      .subscribe((res) => {
        this.fieldOfStudyOptions = res;
      });
    this.uniInfoService
      .uniAcademicYear()
      .pipe(mapOption())
      .subscribe((res) => {
        this.academicYearOptions = res;
      });
    this.addressService
      .getProvinces()
      .pipe(
        map((data: any) => {
          return (
            data?.map((data: any) => ({
              label: _.get(data, 'province_name'),
              value: _.get(data, 'province_id'),
            })) || []
          );
        })
      )
      .subscribe((res) => {
        this.provinces = res;
      });
  }
}

export interface University {
  key:any;
  approveCode: string;
  degreeLevel: string;
  university: string;
  degreeName: string;
  major: string;
  branch: string;
}

export const data = [
  {
    approveCode: '000009',
    degreeLevel: 'วิทยาลัยเทคโนโลยีและอุตสาหกรรม การต่อเรือหนองคาย',
    university:
      '174 หมู่ 1 ซอย 2 ถนนแก้ววรวุฒิ ตำบลมีชัย อำเภอเมืองหนองคาย จังหวัดหนองคาย 43000',
    degreeName: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
    major: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
    branch: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
  },
  {
    approveCode: '000009',
    degreeLevel: 'วิทยาลัยเทคโนโลยีและอุตสาหกรรม การต่อเรือหนองคาย',
    university:
      '174 หมู่ 1 ซอย 2 ถนนแก้ววรวุฒิ ตำบลมีชัย อำเภอเมืองหนองคาย จังหวัดหนองคาย 43000',
    degreeName: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
    major: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
    branch: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
  },
  {
    approveCode: '000009',
    degreeLevel: 'วิทยาลัยเทคโนโลยีและอุตสาหกรรม การต่อเรือหนองคาย',
    university:
      '174 หมู่ 1 ซอย 2 ถนนแก้ววรวุฒิ ตำบลมีชัย อำเภอเมืองหนองคาย จังหวัดหนองคาย 43000',
    degreeName: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
    major: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
    branch: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
  },
  {
    approveCode: '000009',
    degreeLevel: 'วิทยาลัยเทคโนโลยีและอุตสาหกรรม การต่อเรือหนองคาย',
    university:
      '174 หมู่ 1 ซอย 2 ถนนแก้ววรวุฒิ ตำบลมีชัย อำเภอเมืองหนองคาย จังหวัดหนองคาย 43000',
    degreeName: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
    major: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
    branch: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
  },
  {
    approveCode: '000009',
    degreeLevel: 'วิทยาลัยเทคโนโลยีและอุตสาหกรรม การต่อเรือหนองคาย',
    university:
      '174 หมู่ 1 ซอย 2 ถนนแก้ววรวุฒิ ตำบลมีชัย อำเภอเมืองหนองคาย จังหวัดหนองคาย 43000',
    degreeName: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
    major: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
    branch: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
  },
];
