import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  careerTypeList,
  SchoolLangMapping,
  SchoolRequestSubType,
  SchoolRequestType,
} from '@ksp/shared/constant';
import { PdfRenderComponent } from '@ksp/shared/dialog';
import {
  KspRequest,
  SchRequestSearchFilter,
  SchTempLicense,
} from '@ksp/shared/interface';
import {
  LoaderService,
  SchoolInfoService,
  SchoolRequestService,
} from '@ksp/shared/service';
import {
  changeToEnglishMonth,
  changeToThaiNumber,
  getCookie,
  hasRejectedRequest,
  schoolMapRequestType,
  thaiDate,
} from '@ksp/shared/utility';
import { Subject } from 'rxjs';

@Component({
  selector: 'ksp-temp-license-register-list',
  templateUrl: './temp-license-register-list.component.html',
  styleUrls: ['./temp-license-register-list.component.scss'],
})
export class TempLicenseRegisterListComponent implements OnInit, AfterViewInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  SchoolRequestSubType = SchoolRequestSubType;
  checkRequestType = schoolMapRequestType;
  schoolId = getCookie('schoolId');
  defaultForm = {
    requesttype: '3',
  };
  initialSearch = true;
  requestTypeList = SchoolRequestType.filter((i) => i.id > 2);
  careerTypeList = careerTypeList;
  searchNotFound = false;
  dataSource = new MatTableDataSource<KspRequest>();
  displayedColumns: string[] = displayedColumns;

  form = this.fb.group({
    licenseSearch: [this.defaultForm],
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private loaderService: LoaderService,
    private fb: FormBuilder,
    private requestService: SchoolRequestService,
    public dialog: MatDialog,
    private schoolInfoService: SchoolInfoService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getTempLicense(request: KspRequest) {
    this.requestService.getTempLicense(request.id).subscribe((res) => {
      //console.log('temp license = ', res);
      this.genPdf(res);
    });
  }

  genPdf(element: SchTempLicense) {
    //console.log('element = ', element);
    const position = element?.position;
    const startDate = new Date(element.licensestartdate || '');
    const endDate = new Date(element.licenseenddate || '');
    const date = new Date(element.licensestartdate || '');
    const thai = thaiDate(date);
    const [day, month, year] = thai.split(' ');
    const fulldateth = `${changeToThaiNumber(day)} เดือน ${month} พ.ศ. ${year}`;
    const fulldateen = `${day} Day of ${changeToEnglishMonth(month)} B.E. ${
      parseInt(year) - 543
    }`;
    const name = element.firstnameth + ' ' + element.lastnameth;
    const nameen = element.firstnameen + ' ' + element.lastnameen;
    const start = thaiDate(startDate);
    const end = thaiDate(endDate);
    const startth = changeToThaiNumber(start);
    const endth = changeToThaiNumber(end);
    const starten = changeToEnglishMonth(start);
    const enden = changeToEnglishMonth(end);
    const careertype = SchoolRequestSubType[+(element?.licensetype ?? '1')];
    const careertypeen = SchoolLangMapping[careertype ?? 'ครู'] ?? '';
    const requestno = element.licenseno ?? '';
    const prefix = element.licensetype == '1' ? 'ท.' : 'อ.';
    const payload = {
      schoolid: this.schoolId,
    };

    this.schoolInfoService.getSchoolInfo(payload).subscribe((res: any) => {
      const schoolname = res.schoolname;
      const bureauname = res.bureauname;
      const schoolapprovename = 'ผู้อํานวยการสถานศึกษา';
      const schoolapprovenameen = 'director of the educational institution';
      this.dialog.open(PdfRenderComponent, {
        width: '1200px',
        height: '100vh',
        data: {
          pdfType: element.licensetype,
          pdfSubType: 3,
          input: {
            prefix,
            schoolapprovename,
            schoolapprovenameen,
            requestno,
            careertype,
            careertypeen,
            name,
            nameen,
            startth,
            endth,
            starten,
            enden,
            schoolname,
            bureauname,
            day,
            month,
            year,
            position,
            fulldateth,
            fulldateen,
          },
        },
      });
    });
  }

  clear() {
    this.form.reset();
    this.searchNotFound = false;
    this.dataSource.data = [];
    this.form.controls.licenseSearch.patchValue(this.defaultForm);
  }

  search(f: Partial<SchRequestSearchFilter>) {
    //console.log('filters = ', filters);
    const payload: SchRequestSearchFilter = {
      schoolid: `${this.schoolId}`,
      requesttype: '3',
      requestno: f.requestno,
      careertype: f.careertype,
      name: f.name,
      idcardno: f.idcardno,
      passportno: f.passportno,
      process: '5',
      status: '2',
      requestdatefrom: f.requestdatefrom,
      requestdateto: f.requestdateto,
      offset: '0',
      row: '500',
    };

    this.requestService.schSearchRequest(payload).subscribe((res) => {
      // search without showing result do automatically after load

      if (res && res.length) {
        //console.log('res = ', res);
        const data = res.map((i) => {
          const license = JSON.parse(i.detail || '{}');
          return {
            ...i,
            ...{
              licenseDate: license?.licenseDate,
            },
          };
        });
        this.searchNotFound = false;
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        const sortState: Sort = { active: 'id', direction: 'desc' };
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
      } else {
        this.dataSource.data = [];
        this.searchNotFound = true;
      }
    });
  }
}

export const displayedColumns = [
  'order',
  'idcardno',
  'name',
  'requesttype',
  'careertype',
  'requestdate',
  'licensepdf',
];
