import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  EsSearchPayload,
  KspRequest,
  Prefix,
  SchRequestSearchFilter,
  SelfApproveList,
  SelfLicense,
} from '@ksp/shared/interface';
import {
  ERequestService,
  GeneralInfoService,
  LoaderService,
} from '@ksp/shared/service';
import {
  formatDatePayload,
  formatDateTimePayload,
  replaceEmptyWithNull,
} from '@ksp/shared/utility';
import localForage from 'localforage';
import { Observable, Subject } from 'rxjs';
import moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { qualificationCareerTypeList } from '@ksp/shared/constant';

@Component({
  selector: 'ksp-create-license-id-detail',
  templateUrl: './create-license-id-detail.component.html',
  styleUrls: ['./create-license-id-detail.component.scss'],
})
export class CreateLicenseIdDetailComponent implements OnInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  displayedColumns1: string[] = column1;
  displayedColumns2: string[] = column2;
  dataSource1 = new MatTableDataSource<SelfApproveList>();
  dataSource2 = new MatTableDataSource<KspRequest>();
  prefixList!: Observable<Prefix[]>;
  licenseTypes = qualificationCareerTypeList;
  form = this.fb.group({
    data: this.fb.array([]),
  });

  get licenseInfoFormArray() {
    return this.form.controls.data as FormArray;
  }

  constructor(
    private router: Router,
    private requestService: ERequestService,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    public dialog: MatDialog,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.getStoredData();
    this.prefixList = this.generalInfoService.getPrefix();
  }

  completeDialog() {
    this.dialog.open(CompleteDialogComponent, {
      data: {
        header: `สร้างหนังสืออนุญาตสำเร็จ`,
      },
    });
  }

  sameIdCardDialog() {
    this.dialog.open(CompleteDialogComponent, {
      data: {
        header: `รายชื่อนี้ได้ถูกใช้สร้างหนังสืออนุญาตไปแล้ว`,
        btnLabel: 'ตกลง',
      },
    });
  }

  addRow(form: SelfLicense) {
    const data = this.fb.group({
      id: [form.id],
      licenseno: [form.licenseno],
      licensetype: [form.licensetype],
      licensestartdate: [form.licensestartdate],
      licenseenddate: [form.licenseenddate],
      idcardno: [form.idcardno],
      careertype: [form.careertype],
      prefixth: [form.prefixth],
      firstnameth: [form.firstnameth],
      lastnameth: [form.lastnameth],
      prefixen: [form.prefixen],
      firstnameen: [form.firstnameen],
      lastnameen: [form.lastnameen],
      sex: [form.sex],
      birthdate: [form.birthdate],
      imageinfo: [form.imageinfo],
    });
    this.licenseInfoFormArray.push(data);
  }

  createMultiLicense(id: string | null = null) {
    const data = id
      ? this.dataSource2.data.filter((i) => i.id === id)
      : this.dataSource2.data;

    const payload = {
      data: data.map((ds) => {
        return formatDatePayload({
          careertype: ds.careertype,
          renewtype: '1', // allow only 1 ขอขึ้นทะเบียน and 2 ต่ออายุ
          isforeign: ds.isforeign,
          licenseno: null,
          requestno: ds.id, // store request id instead of no
          licensestartdate: moment().format('yyyy-MM-DD'),
          licenseenddate: moment().add(5, 'years').format('yyyy-MM-DD'), // มีอายุ 5 ปี
          licensestatus: '1',
          licensetype: '1',
          teachercouncilidno: ds.kuruspano, // the same as kuruspa no
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
          kuruspano: ds.kuruspano,
        });
      }),
    };
    //console.log('payload = ', payload);
    this.requestService.createMultipleLicense(payload).subscribe((res) => {
      if (res && res.datareturn) {
        //console.log('data return = ', res.datareturn);
        for (let i = 0; i < res.datareturn.length; i++) {
          this.addRow(res.datareturn[i]);
        }
        this.completeDialog();
      } else {
        this.sameIdCardDialog();
      }
    });
  }

  updateLicense() {
    let formArray = this.form.value.data;

    formArray = formArray?.map((f: any) => {
      const { imageinfo, ...data } = f;
      return formatDateTimePayload(data);
    });

    const payload = {
      data: formArray,
    };
    console.log('payload = ', payload);
    this.requestService.updateBulkLicense(payload).subscribe((res) => {
      //console.log('update = ', res);
    });
  }

  getStoredData() {
    localForage
      .getItem<SelfApproveList[]>('selected-for-create-license')
      .then((res) => {
        if (res) {
          this.dataSource1.data = res.map((i) => {
            return { ...i, count: JSON.parse(i.requestlist || '').length };
          });

          const listno = res.map((r: any) => r.listno).join(',');
          if (listno) {
            const payload = {
              listno,
              offset: '0',
              row: '500',
            };
            this.requestService
              .getRequestListByListNo(payload)
              .subscribe((res) => {
                if (res?.datareturn) {
                  this.dataSource2.data = res.datareturn;
                }
              });
          }
        }
      });
  }

  confirmDialog(id: string | null = null) {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยืนยันข้อมูล
        และสร้างหนังสืออนุญาต ใช่หรือไม่? `,
      },
    });

    dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.createMultiLicense(id);
      }
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
      row: '500',
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

const column2 = [
  'create',
  'order',
  'rush',
  'personId',
  'licenseType',
  'name',
  'licenseGroup',
  'approveDate',
  'verifyDate',
  //'view',
];
