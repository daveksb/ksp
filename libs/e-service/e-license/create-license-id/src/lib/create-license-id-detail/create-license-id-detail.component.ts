import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  EsSearchPayload,
  KspRequest,
  Prefix,
  SchRequestSearchFilter,
} from '@ksp/shared/interface';
import { ERequestService, GeneralInfoService } from '@ksp/shared/service';
import { replaceEmptyWithNull } from '@ksp/shared/utility';
import localForage from 'localforage';
import { Observable } from 'rxjs';

@Component({
  selector: 'ksp-create-license-id-detail',
  templateUrl: './create-license-id-detail.component.html',
  styleUrls: ['./create-license-id-detail.component.scss'],
})
export class CreateLicenseIdDetailComponent implements OnInit {
  displayedColumns1: string[] = column1;
  dataSource1 = new MatTableDataSource<info1>();
  displayedColumns2: string[] = column2;
  dataSource2 = new MatTableDataSource<KspRequest>();
  prefixList!: Observable<Prefix[]>;
  licenseTypes = [{ value: 1, name: 'ใบอนุญาตประกอบวิชาชีพครู' }];
  myImage: any = null;

  form = this.fb.group({
    licenseno: [],
    idcardno: [],
    careertype: [],
    prefixth: [],
    firstnameth: [],
    lastnameth: [],
    prefixen: [],
    firstnameen: [],
    lastnameen: [],
    sex: [],
    birthdate: [],
    licensestartdate: [],
    licenseenddate: [],
  });

  constructor(
    private router: Router,
    private requestService: ERequestService,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService
  ) {}

  ngOnInit(): void {
    localForage.getItem('selected-for-create-license').then((res: any) => {
      if (res) {
        this.dataSource1.data = res;
      }
    });

    this.search({});
    this.prefixList = this.generalInfoService.getPrefix();
  }

  rowSelect(data: any) {
    console.log('data = ', data);
    //this.myImage = atob(data.imagefileid);
    this.form.patchValue(data);
  }

  createMultiLicense() {
    console.log('ds = ', this.dataSource2.data);

    const payload: any = {
      data: this.dataSource2.data.map((ds) => {
        return {
          careertype: ds.careertype,
          renewtype: '1',
          isforeign: ds.isforeign,
          licenseno: '2',
          requestno: ds.id,
          licensestartdate: '2022-11-12',
          licenseenddate: '2027-11-12',
          licensestatus: '1',
          licensetype: '1',
          teachercouncilidno: '1',
          imageid: ds.imagefileid,
          idcardno: ds.idcardno,
          prefixth: ds.prefixth,
          firstnameth: ds.firstnameth,
          lastnameth: ds.lastnameth,
          prefixen: ds.prefixen,
          firstnameen: ds.firstnameen,
          lastnameen: ds.lastnameen,
          passportno: ds.passportno,
          addressinfo: ds.addressinfo,
          schooladdrinfo: ds.schooladdrinfo,
          eduinfo: ds.schooladdrinfo,
          experienceinfo: ds.experienceinfo,
          competencyinfo: ds.competencyinfo,
          selfdevelopmentinfo: null,
          fileinfo: ds.fileinfo,
          schoolid: ds.schoolid,
          birthdate: ds.birthdate,
          sex: ds.sex,
          contactphone: ds.contactphone,
          workphone: ds.workphone,
          email: ds.email,
        };
      }),
    };
    this.requestService.createMultipleLicense(payload).subscribe((res) => {
      console.log('result = ', res);
    });
  }

  search(params: Partial<SchRequestSearchFilter>) {
    let payload: EsSearchPayload = {
      systemtype: '1',
      requesttype: '1',
      requestno: params.requestno,
      careertype: null,
      name: params.name,
      idcardno: params.idcardno,
      passportno: null,
      process: '4',
      status: '3',
      schoolid: null,
      schoolname: null,
      bureauid: null,
      requestdatefrom: null,
      requestdateto: null,
      offset: '0',
      row: '10',
    };

    payload = replaceEmptyWithNull(payload);

    this.requestService.KspSearchRequest(payload).subscribe((res) => {
      this.dataSource2.data = res;
    });
  }

  back() {
    this.router.navigate(['/create-license-id', 'list']);
  }
}

const column1 = [
  'group',
  'list',
  'rush',
  'listcount',
  'licenseType',
  'groupType',
  'status',
  'considerDate',
  'verifyDate',
  'approveDate',
];

interface info1 {
  order: string;
  orderNo: string;
  group: string;
  number: string;
  licenseType: string;
  licenseGroup: string;
  status: string;
  releasedDate: string;
  approveDate: string;
  verifyDate: string;
}

const column2 = [
  'create',
  'order',
  'rush',
  'number',
  'personId',
  'licenseType',
  'name',
  'licenseGroup',
  'approveDate',
  'verifyDate',
];
