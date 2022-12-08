import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  Province,
  SchRequestSearchFilter,
} from '@ksp/shared/interface';
import {
  AddressService,
  ERequestService,
  LoaderService,
} from '@ksp/shared/service';
import {
  checkProcess,
  schoolMapRequestType,
  checkStatus,
  processFilter,
  thaiDate,
} from '@ksp/shared/utility';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'e-service-temp-license-list',
  templateUrl: './temp-license-list.component.html',
  styleUrls: ['./temp-license-list.component.scss'],
})
export class ETempLicenseListComponent implements AfterViewInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
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
  requestLabel = '';
  provinces$!: Observable<Province[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private eRequestService: ERequestService,
    private loaderService: LoaderService,
    private addressService: AddressService
  ) {
    this.checkCareerType();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.provinces$ = this.addressService.getProvinces();
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
        this.requestLabel = 'ชาวต่างชาติ';
        //console.log('career type = ', this.careerType);
      } else {
        this.careerTypeList = careerTypeList.filter((i) => i.id < 3);
        this.requestLabel = 'ชาวไทย';
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
      provinceid: params.provinceid,
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
        const sortState: Sort = {
          active: 'requestdate',
          direction: 'asc',
        };
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
      } else {
        this.clearData();
      }
    });
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
    const email = request.email;
    const nationality = request.nationality;
    const birthdate = request.birthdate;
    const passportno = request.passportno;

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
    const graduate1 = edu1?.graduateDate ?? '';
    const grade1 = edu1?.grade ?? '';
    const admission1 = edu1?.admissionDate ?? '';
    const country1 = edu1?.country ?? '';

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
    const graduate2 = edu2?.graduateDate ?? '';
    const grade2 = edu2?.grade ?? '';

    let degree2 = false;
    if (degreename2) {
      degree2 = true;
    }

    const teachinginfo = JSON.parse(request.teachinginfo || '');

    let lv1 = false;
    let lv2 = false;
    let lv3 = false;
    let lv4 = false;
    let lv5 = false;
    let lv6 = false;
    let lv7 = false;

    for (const index in teachinginfo.teachingLevel) {
      console.log('xxx = ', index);
      if (teachinginfo.teachingLevel[index] === 'level1') {
        lv1 = true;
      }
      if (teachinginfo.teachingLevel[index] === 'level2') {
        lv2 = true;
      }
      if (teachinginfo.teachingLevel[index] === 'level3') {
        lv3 = true;
      }
      if (teachinginfo.teachingLevel[index] === 'level4') {
        lv4 = true;
      }
      if (teachinginfo.teachingLevel[index] === 'level5') {
        lv5 = true;
      }
      if (teachinginfo.teachingLevel[index] === 'level6') {
        lv6 = true;
      }
      if (teachinginfo.teachingLevel[index] === 'level7') {
        lv7 = true;
      }
    }

    const nameen = request.firstnameen + ' ' + request.lastnameen;

    //console.log('request.schooladdrinfo = ', request.schooladdrinfo);
    const school = JSON.parse(request.schooladdrinfo || '');
    //console.log('school = ', school);
    const { address, moo, street, road, tumbon, fax } = school;
    const schoolname = school.schoolName;
    const bureauname = school.bureauName;
    const amphurname = school.amphurName;
    const provincename = school.provinceName;
    const zipcode = school.zipCode;
    const telphone = school.telphone;
    const schoolemail = school.eMail;

    const hiring = JSON.parse(request.hiringinfo || '');
    const hiringStartDate = hiring.startDate;
    const hiringEndDate = hiring.endDate;
    const position = hiring.position;

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
          email,
          schoolemail,
          nationality,
          birthdate,
          passportno,
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
          country1,
          admission1,
          degreename1,
          institution1,
          major1,
          graduate1,
          grade1,
          degree1,
          degreename2,
          institution2,
          major2,
          graduate2,
          grade2,
          degree2,
          nameen,
          lv1,
          lv2,
          lv3,
          lv4,
          lv5,
          lv6,
          lv7,
          hiringStartDate,
          hiringEndDate,
          position,
        },
      },
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
  'updatedate',
  'requestdate',
  'reqDoc',
  //'license',
];
