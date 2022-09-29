import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelfServiceFormModule } from '@ksp/self-service/form';
import { ListData } from '@ksp/shared/interface';
import { TopNavComponent } from '@ksp/shared/menu';
import { DegreeHomeSearchComponent } from '@ksp/shared/search';
import { AddressService, UniInfoService } from '@ksp/shared/service';
import { UniFormBadgeComponent } from '@ksp/shared/ui';
import _ from 'lodash';
import moment from 'moment';
import { map } from 'rxjs';
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
  templateUrl: './uni-home.component.html',
  styleUrls: ['./uni-home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SelfServiceFormModule,
    MatTableModule,
    TopNavComponent,
    ReactiveFormsModule,
    DegreeHomeSearchComponent,
    UniFormBadgeComponent,
  ],
})
export class UniHomeComponent {
  badgeTitle1 = [
    `เลขที่คำขอ : 010641000123
  รายการขอรับรองปริญญาและประกาศนียบัตรทางการศึกษา ถูกส่งคืน “ปรับแก้ไข /
  เพิ่มเติม`,
  ];

  badgeTitle2 = [
    `กรุณาส่งกลับภายในวันที่ DD/MM/YYYY มิฉะนั้นใบคำขอจะถูกยกเลิก`,
  ];

  form = this.fb.group({
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
  constructor(
    private fb: FormBuilder,
    private uniInfoService: UniInfoService,
    private addressService: AddressService
  ) {
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
  dataSource = new MatTableDataSource<DegreeInfo>();
  private _findOptions(dataSource: any, key: any) {
    return _.find(dataSource, { value: key })?.label || '-';
  }
  mapTable = () =>
    map((res: any) => {
      return res?.datareturn?.map((row: any, index: number) => {
        const degreeLevel = this._findOptions(
          this.degreeLevelOptions,
          row?.degreelevel
        );
        const major = this._findOptions(this.majorOptions, row?.coursemajor);
        const branch = this._findOptions(
          this.majorOptions,
          row?.coursesubjects
        );
        const approveDate = row?.createdate
          ? moment(row?.createdate).format('DD/MM/YYYY')
          : '-';
        return {
          order: ++index,
          approveNumber: row?.degreeapprovecode || '-',
          degreeLevel,
          uniName: row?.uniname || '-',
          degreeName: row?.fulldegreenameth || '-',
          major,
          branch,
          approveDate: approveDate,
        };
      });
    });
  search() {
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
      offset: '0',
      row: '10',
    };
    this.uniInfoService
      .uniDegreeSearch(payload)
      .pipe(this.mapTable())
      .subscribe((res) => {
        this.dataSource.data = res;
      });
  }

  clear() {
    this.form.reset();
    this.dataSource.data = [];
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
}

export interface DegreeInfo {
  order: number;
  approveNumber: string;
  degreeLevel: string;
  uniName: string;
  degreeName: string;
  major: string;
  branch: string;
  approveDate: string;
}

export const data: DegreeInfo[] = [
  {
    order: 1,
    approveNumber: '00069784',
    degreeLevel: 'ปริญญาตรีทางการศึกษา (หลักสูตร 4 ปี)',
    uniName: 'มหาวิทยาลัยราชภัฏพระนครศรีอยุธยา',
    degreeName: 'การศึกษาบัณฑิต สาขาวิชาเคมี หลักสูตรปรับปรุง พ.ศ.2562',
    major: 'วิทยาศาสตร์พื้นฐาน',
    branch: 'วิทยาศาสตร์บัณฑิต',
    approveDate: '10/10/2565',
  },
  {
    order: 2,
    approveNumber: '00069784',
    degreeLevel: 'ปริญญาตรีทางการศึกษา (หลักสูตร 4 ปี)',
    uniName: 'มหาวิทยาลัยราชภัฏพระนครศรีอยุธยา',
    degreeName: 'การศึกษาบัณฑิต สาขาวิชาเคมี หลักสูตรปรับปรุง พ.ศ.2562',
    major: 'วิทยาศาสตร์พื้นฐาน',
    branch: 'วิทยาศาสตร์บัณฑิต',
    approveDate: '10/10/2565',
  },
  {
    order: 3,
    approveNumber: '00069784',
    degreeLevel: 'ปริญญาตรีทางการศึกษา (หลักสูตร 4 ปี)',
    uniName: 'มหาวิทยาลัยราชภัฏพระนครศรีอยุธยา',
    degreeName: 'การศึกษาบัณฑิต สาขาวิชาเคมี หลักสูตรปรับปรุง พ.ศ.2562',
    major: 'วิทยาศาสตร์พื้นฐาน',
    branch: 'วิทยาศาสตร์บัณฑิต',
    approveDate: '10/10/2565',
  },
];
