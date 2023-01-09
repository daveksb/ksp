import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormMode } from '@ksp/shared/interface';
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
import { formatDate, getCookie, thaiDate } from '@ksp/shared/utility';
import { v4 as uuidv4 } from 'uuid';

@Component({
  templateUrl: './foreign-student-id.component.html',
  styleUrls: ['./foreign-student-id.component.scss'],
})
export class ForeignStudentIdComponent {
  @Input() mode: FormMode = 'edit';
  foreignInfo = [{ name: '1.สำเนาหนังสือเดินทาง',filename: ""  }];
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
  uniAddress = '-';
  uniName = '-';
  uniid = '';
  unitype = '';
  requestNumber = '';
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private uniRequestService: UniRequestService,
    private addressService: AddressService,
    private generalInfoService: GeneralInfoService,
    private uniInfoService: UniInfoService,
    private loaderService: LoaderService
  ) {
    this.uniqueTimestamp = uuidv4();

    this.getAll();
  }
  get formValid() {
    return !this.form.get('foreignStudent')?.valid;
  }
  getAll() {
    this.uniid = getCookie('uniId') || '';
    this.unitype = getCookie('uniType') || '';

    this.countries$ = this.addressService.getCountry();
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.visaTypeList$ = this.generalInfoService.getVisaType();
    this.uniInfoService
      .univerSitySelectById(this.uniid)
      .subscribe((res) => {
        this.uniName = res?.name + (res?.campusname ? `, ${res?.campusname}` : '') || '-';
        this.universityCode = res?.universitycode || '-';
        this.uniAddress = '-';
      });
  }
  cancel() {
    this.router.navigate(['/', 'home']);
  }
  getDefaultReq(value:any):any{
    const payload = {...value};
    payload.birthdate = value?.birthdate ? formatDate(new Date(value?.birthdate).toISOString()) : null
    payload.passportenddate = value?.passportenddate ? formatDate(new Date(value?.passportenddate).toISOString()) : null
    payload.passportstartdate = value?.passportstartdate ? formatDate(new Date(value?.passportstartdate).toISOString()) : null
    payload.careertype = "5"
    return payload;
  }
  save() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูล
        และส่งใบคำขอ ใช่หรือไม่? `,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      //console.log(`Dialog result: ${result}`);
    });

    dialogRef.componentInstance.confirmed
      .pipe(
        switchMap((res) => {
          if (res) {
            const studentInfo = this.getDefaultReq(this.form.value.foreignStudent)
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
            studentInfo.fileInfo = JSON.stringify(this.foreignInfo);
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
        เลขที่ใบคำขอ : ${res?.requestno || '-'}`
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/foreign-student-id', 'list']);
      }
    });
  }
}
