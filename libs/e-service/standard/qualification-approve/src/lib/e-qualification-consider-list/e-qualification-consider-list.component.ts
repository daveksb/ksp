import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  SchoolRequestType,
  SchoolRequestSubType,
  qualificationCareerTypeList,
} from '@ksp/shared/constant';
import { PdfRenderComponent } from '@ksp/shared/dialog';
import {
  KspRequest,
  SchRequestSearchFilter,
  EsSearchPayload,
} from '@ksp/shared/interface';
import { ERequestService, LoaderService } from '@ksp/shared/service';
import { checkProcess, checkStatus, thaiDate } from '@ksp/shared/utility';
import { Subject } from 'rxjs';

@Component({
  selector: 'ksp-e-qualification-consider-list',
  templateUrl: './e-qualification-consider-list.component.html',
  styleUrls: ['./e-qualification-consider-list.component.scss'],
})
export class EQualificationConsiderListComponent implements AfterViewInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  requestTypeList = SchoolRequestType.filter((i) => i.id > 2);
  checkProcess = checkProcess;
  checkStatus = checkStatus;
  SchoolRequestSubType = SchoolRequestSubType;
  careerTypeList = qualificationCareerTypeList;
  displayedColumns: string[] = column2;
  dataSource = new MatTableDataSource<any>();
  searchNotFound = false;

  form = this.fb.group({
    search: [{ requesttype: '6', process: '3', status: '1' }],
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private eRequestService: ERequestService,
    private loaderService: LoaderService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  renderLicense(request: KspRequest) {
    const pdfType = 99;
    const pdfSubType = 6;
    const requestno = request.requestno;
    const name = request.firstnameth + ' ' + request.lastnameth;
    const position = request.position;
    const bureauname = request.bureauname;
    const schoolname = request.schoolname;
    const approveresult = request.status;
    const careertype = SchoolRequestSubType[Number(request.careertype)];
    const eduinfo = JSON.parse(request.eduinfo || '');
    //console.log('yyy = ', eduinfo);
    const edu1 = eduinfo.find((item: any) => {
      if (item?.degreeLevel) {
        return item.degreeLevel === 1;
      }
      return false;
    });
    const degreelevel = edu1.degreeName ?? '';
    const degreeof = edu1.degreeName ?? '';
    const degreefrom = edu1.institution ?? '';
    const degreename = edu1.major ?? '';

    this.dialog.open(PdfRenderComponent, {
      width: '1200px',
      height: '100vh',
      data: {
        pdfType,
        pdfSubType,
        input: {
          requestno,
          approveresult,
          name,
          position,
          bureauname,
          schoolname,
          careertype,
          eduinfo,
          degreename,
          degreefrom,
          degreelevel,
          degreeof,
        },
      },
    });
  }

  requestPdf(request: KspRequest) {
    const pdfType = 6;
    const pdfSubType = request.careertype;
    const date = new Date(request.requestdate || '');
    const thai = thaiDate(date);
    const [day, month, year] = thai.split(' ');
    const name = request.firstnameth + ' ' + request.lastnameth;
    const phone = request.contactphone;
    const telphone = request.workphone;
    const bureauname = request.bureauname;
    const schoolname = request.schoolname;
    const [
      id1,
      id2,
      id3,
      id4,
      id5,
      id6,
      id7,
      id8,
      id9,
      id10,
      id11,
      id12,
      id13,
    ] = request?.idcardno?.split('') ?? [];

    const position = request.position;
    const eduinfo = JSON.parse(request.eduinfo || '');
    const degreelevel = eduinfo[0].degreeLevel;

    let checkbox1 = false;
    if (degreelevel === 1) {
      checkbox1 = true;
    }

    const edu1 = eduinfo.find((item: any) => {
      if (item?.degreeLevel) {
        return item.degreeLevel === '1';
      }
      return false;
    });

    const degreename1 = edu1?.degreeName ?? '';
    const institution1 = edu1?.institution ?? '';
    const major1 = edu1?.major ?? '';
    const graduateDate1 = edu1?.graduateDate ?? '';

    let degree1 = false;
    if (degreename1) {
      degree1 = true;
    }

    const edu2 = eduinfo.find((item: any) => {
      if (item?.degreeLevel) {
        return item.degreeLevel === '2';
      }
      return false;
    });

    const degreename2 = edu2?.degreeName ?? '';
    const institution2 = edu2?.institution ?? '';
    const major2 = edu2?.major ?? '';
    const graduateDate2 = edu2?.graduateDate ?? '';

    let degree2 = false;
    if (degreename2) {
      degree2 = true;
    }

    const nameen = request.firstnameen + ' ' + request.lastnameen;

    /* const hiring = JSON.parse(request.hiringinfo || '');
    const position = hiring.position; */

    /*  const school = JSON.parse(request.schooladdrinfo || '');

    const { address, moo, street, road, tumbon, fax } = school;
    const amphurname = school.amphurname;
    const provincename = school.provincename;
    const zipcode = school.zipcode;
    const zipcode = school.fax;  */

    this.dialog.open(PdfRenderComponent, {
      width: '1200px',
      height: '100vh',
      data: {
        pdfType,
        pdfSubType,
        input: {
          day,
          month,
          year,
          schoolname,
          bureauname,
          /*  address,
          moo,
          street,
          road,
          tumbon,
          amphurname,
          provincename,
          zipcode,
          fax, */
          name,
          phone,
          telphone,
          position,
          id1,
          id2,
          id3,
          id4,
          id5,
          id6,
          id7,
          id8,
          id9,
          id10,
          id11,
          id12,
          id13,
          degreename1,
          institution1,
          major1,
          degree1,
          graduateDate1,
          degreename2,
          institution2,
          major2,
          degree2,
          graduateDate2,
          nameen,
          checkbox1,
        },
      },
    });
  }

  search(p: Partial<SchRequestSearchFilter>) {
    //console.log('params = ', params);
    const payload: EsSearchPayload = {
      systemtype: null,
      requesttype: '6',
      requestno: p.requestno,
      careertype: p.careertype,
      name: p.name,
      idcardno: p.idcardno,
      passportno: p.passportno,
      process: p.process,
      status: p.status,
      schoolid: p.schoolid,
      schoolname: null,
      bureauid: null,
      requestdatefrom: p.requestdatefrom,
      requestdateto: p.requestdateto,
      offset: '0',
      row: '500',
    };

    this.eRequestService.KspSearchRequest(payload).subscribe((res) => {
      if (res) {
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        const sortState: Sort = { active: 'id', direction: 'desc' };
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
        this.searchNotFound = false;
      } else {
        this.clear();
        this.searchNotFound = true;
      }
    });
  }

  clear() {
    this.searchNotFound = false;
    this.dataSource.data = [];
    this.form.reset();
    this.form.controls.search.patchValue({
      requesttype: '6',
      process: '3',
      status: '1',
    });
  }

  goToDetail(item: KspRequest) {
    this.router.navigate(
      ['/qualification-approve', 'consider-detail', item.id],
      {
        queryParams: { subtype: item.careertype },
      }
    );
  }

  createGroup() {
    this.router.navigate(['/qualification-approve', 'consider-meeting']);
  }
}

export const column2 = [
  'id',
  'edit',
  'requestno',
  'idcardno',
  'name',
  'careertype',
  'process',
  'status',
  'updatedate',
  'requestdate',
  'reqDoc',
  //'license',
  'resultdoc',
  'history',
];
