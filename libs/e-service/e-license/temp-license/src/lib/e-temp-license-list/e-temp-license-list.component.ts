import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {
  careerTypeList,
  SchoolRequestSubType,
  SchoolRequestType,
} from '@ksp/shared/constant';
import {
  EsSearchPayload,
  KspRequest,
  SchRequestSearchFilter,
} from '@ksp/shared/interface';
import { ERequestService } from '@ksp/shared/service';
import {
  checkProcess,
  schoolMapRequestType,
  checkStatus,
  processFilter,
} from '@ksp/shared/utility';

@Component({
  selector: 'e-service-temp-license-list',
  templateUrl: './e-temp-license-list.component.html',
  styleUrls: ['./e-temp-license-list.component.scss'],
})
export class ETempLicenseListComponent implements AfterViewInit {
  form!: any;
  defaultForm: any;

  displayedColumns: string[] = column;
  dataSource = new MatTableDataSource<KspRequest>();
  SchoolRequestSubType = SchoolRequestSubType;
  checkProcess = checkProcess;
  checkRequestType = schoolMapRequestType;
  checkStatus = checkStatus;
  requestTypeList = SchoolRequestType.filter((i) => i.id > 2);
  careerType = 1;
  careerTypeList: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private eRequestService: ERequestService
  ) {
    this.checkCareerType();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  checkCareerType() {
    this.route.paramMap.subscribe((params) => {
      this.defaultForm = {
        requesttype: '3',
        careertype: params.get('careertype'),
      };
      this.form = this.fb.group({
        search: [this.defaultForm],
      });

      if (params.get('careertype') === '5') {
        this.careerType = Number(params.get('careertype'));
        this.careerTypeList = careerTypeList.filter((i) => i.id === 5);
        //console.log('career type = ', this.careerType);
      } else {
        this.careerTypeList = careerTypeList.filter((i) => i.id < 3);
        //console.log('no career type ');
      }
    });
  }

  search(params: Partial<SchRequestSearchFilter>) {
    console.log('params = ', params);
    const payload: EsSearchPayload = {
      systemtype: '2',
      requesttype: '3',
      requestno: params.requestno,
      careertype: params.careertype,
      name: params.name,
      idcardno: params.idcardno,
      passportno: params.passportno,
      process: params.process,
      status: params.status,
      schoolid: null,
      schoolname: null,
      bureauid: null,
      requestdatefrom: params.requestdatefrom,
      requestdateto: params.requestdateto,
      offset: '0',
      row: '500',
    };

    this.eRequestService.KspSearchRequest(payload).subscribe((res) => {
      if (res && res.length) {
        this.dataSource.data = res;
        this.dataSource.data = processFilter(res);

        this.dataSource.sort = this.sort;
        const sortState: Sort = { active: 'id', direction: 'desc' };
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
      } else {
        this.clearData();
      }
    });
  }

  clearData() {
    this.dataSource.data = [];
    this.form.reset();
    this.form.controls.search.patchValue(this.defaultForm);
  }

  goToDetail(item: KspRequest) {
    //console.log('item = ', item);
    this.router.navigate(['/temp-license', 'detail', item.id], {
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
  'subtype',
  'currentprocess',
  'requeststatus',
  //'updatedate',
  'requestdate',
  'reqDoc',
  //'approveDoc',
];
