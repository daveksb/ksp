import { getCookie, stringToThaiDate, thaiDate } from '@ksp/shared/utility';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelfServiceFormModule } from '@ksp/self-service/form';
import { ListData, KspPaginationComponent } from '@ksp/shared/interface';
import { TopNavComponent } from '@ksp/shared/menu';
import { DegreeHomeSearchComponent } from '@ksp/shared/search';
import {
  AddressService,
  LoaderService,
  UniInfoService,
} from '@ksp/shared/service';
import { UniFormBadgeComponent } from '@ksp/shared/ui';
import _ from 'lodash';
import { map, Subject } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
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
  templateUrl: './degree-data.component.html',
  styleUrls: ['./degree-data.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SelfServiceFormModule,
    MatTableModule,
    TopNavComponent,
    ReactiveFormsModule,
    DegreeHomeSearchComponent,
    UniFormBadgeComponent,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
})
export class UniDegreeDataComponent extends KspPaginationComponent implements OnInit {
  badgeTitle1: any;
  badgeTitle2: any;

  // badgeTitle1 = [
  //   `เลขที่คำขอ : 010641000123
  // รายการขอรับรองปริญญาและประกาศนียบัตรทางการศึกษา ถูกส่งคืน “ปรับแก้ไข /
  // เพิ่มเติม`,
  // ];

  // badgeTitle2 = [
  //   `กรุณาส่งกลับภายในวันที่ DD/MM/YYYY มิฉะนั้นแบบคำขอจะถูกยกเลิก`,
  // ];

  form: any = this.fb.group({
    homeSearch: [],
  });
  degreeLevelOptions: ListData[] = [];
  fieldOfStudyOptions: ListData[] = [];
  majorOptions: ListData[] = [];
  subjectOptions: ListData[] = [];
  academicYearOptions: ListData[] = [];
  provinces: ListData[] = [];
  universityType: ListData[] = [];
  universities: ListData[] = [];
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  constructor(
    private fb: FormBuilder,
    private uniInfoService: UniInfoService,
    private addressService: AddressService,
    private loaderService: LoaderService,
    private router: Router,
  ) {
    super();
    this.getAll();
  }

  displayedColumns: string[] = [
    'order',
    'approveNumber',
    'degreeLevel',
    'uniName',
    'degreeName',
    'major',
    'branch',
    'approveDate',
  ];
  dataSource = new MatTableDataSource<DegreeInfoDetail>();
  private _findOptions(dataSource: any, key: any) {
    return _.find(dataSource, { value: key })?.label || '-';
  }
  ngOnInit(): void {
    this.initFormData();
  }
  override search() {
    const value: any = this.form.value?.homeSearch;
    const payload = {
      uniid: value?.university || '',
      unitype: value?.universityType || '',
      fulldegreenameth: value?.degreeName || '',
      degreelevel: value?.degreeLevel || '',
      courseacademicyear: value?.year || '',
      degreeapprovecode: value?.degreeCode || '',
      coursefieldofstudy: value?.fieldOfStudy || '',
      coursemajor: value?.major || '',
      coursesubjects: value?.subject || '',
      uniprovince: value?.province || '',
      ...this.tableRecord,
    };
    this.uniInfoService.uniDegreeSearch(payload).subscribe(async (res) => {
      const newData: any[] = [];
      this.pageEvent.length = res?.countrow;
      for (const row of res?.datareturn || []) {
        const degreeLevel = this._findOptions(
          this.degreeLevelOptions,
          row?.degreelevel
        );

        const approveDate = row?.createdate
          ? thaiDate(new Date(row?.createdate))
          : '';
        const { major, branch } = await this.uniInfoService.getMajorAndBranch(
          row
        );
        newData.push({
          id: row?.id,
          approveNumber: row?.degreeapprovecode || '-',
          degreeLevel,
          uniName: row?.uniname || '-',
          degreeName: row?.fulldegreenameth || '-',
          coursemajor: row?.coursemajor,
          coursesubjects: row?.coursesubjects,
          approveDate: approveDate,
        });
      }
      this.dataSource.data = newData;
    });
  }

  clear() {
    this.form.reset();
    this.initFormData();
    this.clearPageEvent();
    this.search();
  }
  initFormData() {
    this.form.setValue({
      homeSearch: {
        universityType: getCookie('uniType'),
        university: getCookie('uniId'),
      },
    });
  }
  getAll() {
    if (getCookie('uniType')) {
      this.uniInfoService
        .getUniversity(getCookie('uniType'))
        .subscribe((res) => {
          if (res) {
            this.universities =
              res.map((data: any) => ({
                label:
                  _.get(data, 'name') +
                  (_.get(data, 'campusname')
                    ? `, ${_.get(data, 'campusname')}`
                    : ''),
                value: _.get(data, 'id'),
              })) || [];
          } else {
            this.universities = [];
          }
        });
    }
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
  onSelectChange(e: any): any {
    const key = e?.key;
    const value = e.value;
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

  goToDetailPage(id: any) {
    this.router.navigate([
      '/',
      'student-list',
      'course-detail',
      'view',
      id,
    ]);
  }
}

export interface DegreeInfoDetail {
  order: number;
  approveNumber: string;
  degreeLevel: string;
  uniName: string;
  degreeName: string;
  major: string;
  branch: string;
  approveDate: string;
}