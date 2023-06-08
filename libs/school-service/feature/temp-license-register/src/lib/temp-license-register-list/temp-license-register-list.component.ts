import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  schoolMapRequestType,
  thaiDate,
} from '@ksp/shared/utility';
import { Subject } from 'rxjs';

@Component({
  selector: 'ksp-temp-license-register-list',
  templateUrl: './temp-license-register-list.component.html',
  styleUrls: ['./temp-license-register-list.component.scss'],
})
export class TempLicenseRegisterListComponent implements AfterViewInit {
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getTempLicense(request: KspRequest) {
    this.requestService.getTempLicense(request.id).subscribe((res) => {
      console.log('temp license = ', res);
      this.genPdf(res);
    });
  }

  genPdf(element: SchTempLicense) {
    console.log('element = ', element);
    const position = element?.position;
    const startDate = new Date(element.licensestartdate || '');
    const endDate = new Date(element.licenseenddate || '');
    const date = new Date(element.licensestartdate || '');
    const thai = thaiDate(date);
    const [day, month, year] = thai.split(' ');
    const fulldateth = `${changeToThaiNumber(
      day
    )} เดือน ${month} พ.ศ. ${changeToThaiNumber(year)}`;
    const fulldateen = `${day} Day of ${changeToEnglishMonth(month)} B.E. ${
      parseInt(year) - 543
    }`;

    let prefixen = '';
    let prefixth = '';

    if (element.prefixen === '1') {
      prefixen = 'MR.';
    } else if (element.prefixen === '2') {
      prefixen = 'MRS.';
    } else if (element.prefixen === '3') {
      prefixen = 'MISS.';
    } else if (element.prefixen === '4') {
      prefixen = 'MS.';
    } else if (element.prefixen === '5') {
      prefixen = 'LADY';
    } else if (element.prefixen === '6') {
      prefixen = 'M.L.';
    } else if (element.prefixen === '7') {
      prefixen = 'M.R.';
    } else if (element.prefixen === '8') {
      prefixen = 'M.C.';
    } else {
      prefixen = 'Not Indentified';
    }
    const nameen =
      prefixen + ' ' + element.firstnameen + ' ' + element.lastnameen;

    if (element.prefixth === '1') {
      prefixth = 'นาย';
    } else if (element.prefixth === '2') {
      prefixth = 'นาง';
    } else if (element.prefixth === '3') {
      prefixth = 'นางสาว';
    } else if (element.prefixth === '4') {
      prefixth = 'นางหรือนางสาว';
    } else if (element.prefixth === '5') {
      prefixth = 'ท่านผู้หญิง';
    } else if (element.prefixth === '6') {
      prefixth = 'หม่อมหลวง';
    } else if (element.prefixth === '7') {
      prefixth = 'หม่อมราชวงศ์';
    } else if (element.prefixth === '8') {
      prefixth = 'หม่อมเจ้า';
    } else {
      prefixth = 'ไม่ระบุ';
    }
    const name =
      prefixth + ' ' + element.firstnameth + ' ' + element.lastnameth;

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
      const schoolapprovenameen = 'Director of the Educational Institution';
      this.dialog.open(PdfRenderComponent, {
        width: '1200px',
        height: '100vh',
        data: {
          pdfType: 1,
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

    const resp = this.requestService.schSearchRequest(payload)
    resp?.subscribe((res) => {
      // search without showing result do automatically after load
      if (res && res.length) {
        const data = res.map((i) => {

          const license = JSON.parse(i.detail || '{}');
          console.log( i )
          return {
            ...i,
            ...{
              licenseDate: license?.checkdetail?.approveDate,   // Get approveDate from checkdetail
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
