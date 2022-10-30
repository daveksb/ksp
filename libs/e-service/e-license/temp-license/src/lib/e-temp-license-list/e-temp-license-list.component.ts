import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {
  careerTypeList,
  SchoolRequestSubType,
  SchoolRequestType,
} from '@ksp/shared/constant';
import { PdfRenderComponent } from '@ksp/shared/dialog';
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
  thaiDate,
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
    public dialog: MatDialog,
    private eRequestService: ERequestService
  ) {
    this.checkCareerType();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  renderPdf(request: KspRequest) {
    const date = new Date(request.requestdate || '');
    const pdfType = request.requesttype;
    const pdfSubType = request.careertype;
    const thai = thaiDate(date);
    const [day, month, year] = thai.split(' ');
    const name = request.firstnameth + ' ' + request.lastnameth;
    const phone = request.contactphone;
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
    const eduinfo = JSON.parse(request.eduinfo || '');
    const edu1 = eduinfo.find((item: any) => {
      if (item?.degreeLevel) {
        return item.degreeLevel === '1';
      }
      return false;
    });
    const degreename1 = edu1?.degreeName ?? '';
    const institution1 = edu1?.institution ?? '';
    const major1 = edu1?.major ?? '';
    const nameen = request.firstnameen + ' ' + request.lastnameen;
    let checkbox1 = false;
    if (degreename1) {
      checkbox1 = true;
    }

    const school = JSON.parse(request.schooladdrinfo || '');
    //console.log('school = ', school);
    const { address, moo, street, road, tumbon, fax } = school;
    const schoolname = school.schoolName;
    const bureauname = school.bureauName;
    const amphurname = school.amphurName;
    const provincename = school.provinceName;
    const zipcode = school.zipCode;
    const telphone = school.telphone;

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
          address,
          moo,
          street,
          road,
          tumbon,
          amphurname,
          provincename,
          zipcode,
          fax,
          name,
          phone,
          telphone,
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
          checkbox1,
          nameen,
        },
      },
    });
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
    //console.log('params = ', params);
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
