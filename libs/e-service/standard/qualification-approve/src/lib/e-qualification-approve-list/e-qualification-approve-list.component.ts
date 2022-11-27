import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  qualificationCareerTypeList,
  SchoolRequestSubType,
  SchoolRequestType,
} from '@ksp/shared/constant';
import { PdfRenderComponent } from '@ksp/shared/dialog';
import {
  EsSearchPayload,
  KspRequest,
  SchRequestSearchFilter,
} from '@ksp/shared/interface';
import { ERequestService, LoaderService } from '@ksp/shared/service';
import { checkProcess, checkStatus } from '@ksp/shared/utility';
import { Subject } from 'rxjs';

@Component({
  selector: 'ksp-e-qualification-approve-list',
  templateUrl: './e-qualification-approve-list.component.html',
  styleUrls: ['./e-qualification-approve-list.component.scss'],
})
export class EQualificationApproveListComponent implements AfterViewInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  requestTypeList = SchoolRequestType.filter((i) => i.id > 2);
  checkProcess = checkProcess;
  checkStatus = checkStatus;
  SchoolRequestSubType = SchoolRequestSubType;
  careerTypeList = qualificationCareerTypeList;
  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<any>();
  form = this.fb.group({
    search: [{ requesttype: '6' }],
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
    //console.log('xxx = ', request);
    // render pdf
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

  search(params: Partial<SchRequestSearchFilter>) {
    //console.log('params = ', params);
    const payload: EsSearchPayload = {
      systemtype: '2',
      requesttype: '6',
      requestno: params.requestno,
      careertype: params.careertype,
      name: params.name,
      idcardno: params.idcardno,
      passportno: params.passportno,
      process: params.process,
      status: params.status,
      schoolid: params.schoolid,
      schoolname: null,
      bureauid: null,
      requestdatefrom: params.requestdatefrom,
      requestdateto: params.requestdateto,
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
      } else {
        this.clear();
      }
    });
  }

  clear() {
    this.dataSource.data = [];
    this.form.reset();
    this.form.controls.search.patchValue({ requesttype: '3' });
  }

  goToDetail(item: KspRequest) {
    this.router.navigate(['/qualification-approve', 'detail', item.id], {
      queryParams: { subtype: item.careertype },
    });
  }
}

export const column = [
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
  'license',
];
