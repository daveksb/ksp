import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FileGroup, FormMode, ListData } from '@ksp/shared/interface';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { FormBuilder } from '@angular/forms';
import { EMPTY, Observable, Subject, switchMap } from 'rxjs';
import {
  AddressService,
  GeneralInfoService,
  LoaderService,
  UniInfoService,
  UniRequestService,
} from '@ksp/shared/service';
import {
  formatDate,
  getCookie,
  parseJson,
  thaiDate,
} from '@ksp/shared/utility';
import { v4 as uuidv4 } from 'uuid';

@Component({
  templateUrl: './foreign-student-id.component.html',
  styleUrls: ['./foreign-student-id.component.scss'],
})
export class ForeignStudentIdComponent implements OnInit {
  foreignInfo: FileGroup[] = [
    {
      name: 'สำเนาหนังสือเดินทาง',
      files: [],
    },
  ] as FileGroup[];
  form = this.fb.group({
    foreignStudent: [],
    visainfo: [],
  });
  date = thaiDate(new Date());
  uniqueTimestamp: any;
  prefixList$!: Observable<any>;
  countries$!: Observable<any>;
  visaTypeList$!: Observable<any>;
  universityCode = '-';
  universitytypename = '';
  uniAddress = '-';
  uniName = '-';
  uniid = '';
  unitype = '';
  requestNumber = '';
  requestid = '';
  draftrequest: any;
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  universityTypes: any;
  allowSave = true;
  mode: FormMode = 'edit';

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private uniRequestService: UniRequestService,
    private addressService: AddressService,
    private generalInfoService: GeneralInfoService,
    private uniInfoService: UniInfoService,
    private loaderService: LoaderService,
    private route: ActivatedRoute
  ) {}
  get formValid() {
    return this.form.get('foreignStudent')?.valid;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((res) => {
      this.requestid = res.get('id') || '';
    });
    this.uniqueTimestamp = uuidv4();
    this.getRequest();
    this.getAll();
  }

  getRequest() {
    if (this.requestid) {
      this.allowSave = false;
      this.mode = 'view';
      // this.uniRequestService;
      console.log('get by id');
      this.uniRequestService
        .getUniRequestById(this.requestid)
        .subscribe((res: any) => {
          if (res) {
            console.log(res);
            this.draftrequest = res;
            this.uniid = res.uniid;
            this.unitype = res.unitype;
            this.form.patchValue({
              foreignStudent: res,
              visainfo: res,
            });
            const file = res.fileinfo ? parseJson(res.fileinfo) : [];
            console.log(file);
            this.foreignInfo = file;
            this.getUniversityDetail();
          }
        });
    } else {
      this.allowSave = true;
      this.mode = 'edit';
      console.log('here');
      this.uniid = getCookie('uniId') || '';
      this.unitype = getCookie('uniType') || '';
      this.getUniversityDetail();
    }
    console.log(this.allowSave);
  }

  getUniversityDetail() {
    console.log(this.uniid);
    this.uniInfoService.univerSitySelectById(this.uniid).subscribe((res) => {
      this.uniName =
        res?.name + (res?.campusname ? `, ${res?.campusname}` : '') || '-';
      this.universityCode = res?.universitycode || '-';
      this.uniAddress = '-';
    });
    this.uniInfoService.getUniversityType().subscribe((res: any) => {
      const findUnitype = res.find((data: any) => {
        return data.id == this.unitype;
      });
      console.log(findUnitype);
      if (findUnitype) this.universitytypename = findUnitype.name;
    });
  }

  getAll() {
    this.countries$ = this.addressService.getCountry();
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.visaTypeList$ = this.generalInfoService.getVisaType();
  }

  cancel() {
    this.router.navigate(['/', 'home']);
  }
  getDefaultReq(value: any): any {
    const visainfo = this.form.value.visainfo || {};
    const payload = { ...value, ...visainfo };
    payload.birthdate = value?.birthdate
      ? formatDate(new Date(value?.birthdate).toISOString())
      : null;
    payload.passportenddate = value?.passportenddate
      ? formatDate(new Date(value?.passportenddate).toISOString())
      : null;
    payload.passportstartdate = value?.passportstartdate
      ? formatDate(new Date(value?.passportstartdate).toISOString())
      : null;
    payload.careertype = '5';
    return payload;
  }
  save() {
    console.log(this.form);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูล
        และส่งแบบคำขอ ใช่หรือไม่? `,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      //console.log(`Dialog result: ${result}`);
    });

    dialogRef.componentInstance.confirmed
      .pipe(
        switchMap((res) => {
          if (res) {
            const studentInfo = this.getDefaultReq(
              this.form.value.foreignStudent
            );
            studentInfo.ref1 = '3';
            studentInfo.ref2 = '04';
            studentInfo.ref3 = '5';
            studentInfo.systemtype = '3';
            studentInfo.requesttype = '4';
            studentInfo.subtype = '5';
            studentInfo.currentprocess = `1`;
            studentInfo.requeststatus = `1`;
            studentInfo.process = '1';
            studentInfo.status = '1';
            studentInfo.uniid = this.uniid;
            studentInfo.unitype = this.unitype;
            studentInfo.fileinfo = JSON.stringify(this.foreignInfo);
            return this.uniRequestService.saveRequestInsert(studentInfo);
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
        this.onConfirmed(res);
      });
  }
  onConfirmed(res: any) {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: 'บันทึกข้อมูลสำเร็จ',
        content: `วันที่ ${this.date}
        เลขที่แบบคำขอ : ${res?.requestno || '-'}`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/foreign-student-id', 'list']);
      }
    });
  }
}
