import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router, TitleStrategy } from '@angular/router';
import { KspPaginationComponent, ListData } from '@ksp/shared/interface';
import { EUniService, LoaderService, UniInfoService } from '@ksp/shared/service';
import { parseJson, stringToThaiDate, thaiDate } from '@ksp/shared/utility';
import _ from 'lodash';
import { map, Subject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'ksp-test-performance-list',
  templateUrl: './test-performance-list.component.html',
  styleUrls: ['./test-performance-list.component.scss'],
})
export class TestPerformanceListComponent extends KspPaginationComponent implements OnInit {

  displayedColumns1: string[] = column1;
  dataSource1 = new MatTableDataSource<course>();

  displayedColumns2: string[] = column2;
  universityList: ListData[] = [];
  universityTypeList: ListData[] = [];
  degreeLevelList: ListData[] = [];
  rowSelected: any = {};
  dataSource2 = new MatTableDataSource<student>();
  form = this.fb.group({
    uniid: [null],
    unitype: [null],
    degreeapprovecode: [''],
    degreelevel: [null],
    calendaryear: [''],
    fulldegreename: ['']
  })

  formStudent = this.fb.group({
    name: [''],
    idcardno: ['']
  })
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private eUniservice: EUniService,
    private uniInfoService: UniInfoService,
    private loaderService: LoaderService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getOptions();
  }

  async getOptions() {
    const [university, universityTypes, degreeLevel] =
    await Promise.all([
      lastValueFrom(this.uniInfoService.getUniuniversity()),
      lastValueFrom(this.uniInfoService.getUniversityType()),
      lastValueFrom(this.uniInfoService.getUniDegreelevel())
    ]);
    console.log(university, universityTypes, degreeLevel)
    this.universityList = university.datareturn.map((data: any) => {
      data.value = data.id;
      if (data.campusname) {
        data.label = data.name + `, ${data.campusname}`
      } else {
        data.label = data.name;
      }
      return data;
    });
    this.universityTypeList = universityTypes.map(({ id, name }: any) => ({
      value: id,
      label: name,
    }));;
    this.degreeLevelList = degreeLevel?.datareturn.map(({ id, name }: any) => ({
      value: id,
      label: name,
    }));
  }

  getUniversity() {
    const { unitype } = this.form.getRawValue();
    this.uniInfoService.getUniversity(unitype).subscribe(response=>{
      if (response) {
        this.universityList = response.map((data: any) => {
          data.value = data.id;
          if (data.campusname) {
            data.label = data.name + `, ${data.campusname}`
          } else {
            data.label = data.name;
          }
          return data;
        });
      }
    })
  }

  save() {
    this.router.navigate(['/', 'import-performance', 'detail', this.rowSelected.id]);
  }

  getRequest() {
    return {
      ...this.form.getRawValue(),
      ...this.tableRecord
    }
  }

  override search() {
    this.eUniservice.getDegreeCertResultList(this.getRequest()).subscribe(res => {
      if (res.datareturn) {
        this.pageEvent.length = res.countnum;
        this.dataSource1.data = res.datareturn.map((data :any) => {
          const findType = this.universityTypeList.find(type => { return data.unitype == type.value });
          data.unitypename = findType ? findType.label : '';
          data.createdate = data.createdate ? stringToThaiDate(data.createdate) : '';
          data.studentlist = data.studentlist ? JSON.parse(data.studentlist).map((data: any)=>{
            // data.admissiondate = data.admissiondate ? stringToThaiDate(data.admissiondate) : '';
            // console.log(data.importdate)
            // data.importdate = data.importdate ? thaiDate() : '';
            return data;
          }) : [];
          return data;
        });
      } else {
        this.dataSource1.data = [];
        this.dataSource2.data = [];
      }
    })
  }

  clear() {
    this.dataSource1.data = [];
    this.dataSource2.data = [];
  }

  selectRow(row: any) {
    this.rowSelected = row;
    this.dataSource2 = this.rowSelected.studentlist;
    console.log(this.dataSource2)
  }

  getFullName(element: any) {
    return [element?.prefixth, element?.firstnameth, element?.lastnameth]
      .filter((d: any) => d)
      .join(' ');
  }

  onSearch(search: any, event: any) {
    const searchstring = event.target.value.trim().toLowerCase().replace(/\s/g, '');
    this.dataSource2 = this.rowSelected.studentlist.filter((data: any) => {
      return search == 'name' ? (data.prefixth+data.firstnameth+data.lastnameth).includes(searchstring) 
      : data[search].includes(searchstring);
    })
  }

  downloadfile() {
    window.open('/assets/file/Example_import_performance.xlsx', '_blank');
  }
}

export const column1 = [
  'university',
  'faculty',
  'degreeCode',
  'degreeName',
  'branch',
  'year',
  'importDate',
  'status',
];

export const column2 = [
  'personId',
  'name',
  'faculty',
  'branch',
  'year',
  'importDate',
  'status',
  'knowledgeavg',
  'knowledgeresult',
  'relationavg',
  'relationresult',
  'ethicavg',
  'ethicresult',
  'averageavg',
  'averageresult',
];

export interface course {
  university: string;
  faculty: string;
  degreeCode: string;
  degreeName: string;
  branch: string;
  year: string;
  importDate: string;
  status: string;
}

export interface student {
  personId: string;
  name: string;
  faculty: string;
  branch: string;
  year: string;
  importDate: string;
  status: string;
}

export const courseData: course[] = [
  {
    university: 'มหาวิทยาลัยราชภัฏพระนครศรีอยุธยา',
    faculty: 'วิทยาศาสตร์',
    degreeCode: '069784',
    degreeName: 'การศึกษาบัณฑิต สาขาวิชาเคมี หลักสูตรปรับปรุง พ.ศ.2562',
    branch: 'วิทยาศาสตร์พื้นฐาน',
    year: '2564',
    importDate: '12 ส.ค. 2564 (ครั้งที่ 1)',
    status: 'สำเร็จ',
  },
];

export const studentData: student[] = [
  {
    personId: '3-1020-xXXXX-XX-1',
    name: 'นางสาวมาลัย ซ่อนกลิ่น',
    faculty: 'ครุศาสตร์',
    branch: 'สาขาวิชาภาษาอังกฤษ',
    year: '2564',
    importDate: '10 มิ.ย. 2566',
    status: 'สำเร็จ',
  },
];
