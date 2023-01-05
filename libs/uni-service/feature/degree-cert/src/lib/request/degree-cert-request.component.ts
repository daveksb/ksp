import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';

import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { UniInfoService, UniRequestService } from '@ksp/shared/service';
import {
  getCookie,
  thaiDate,
  parseJson,
  formatDate,
} from '@ksp/shared/utility';
import moment from 'moment';
import { lastValueFrom } from 'rxjs';
@Component({
  templateUrl: './degree-cert-request.component.html',
  styleUrls: ['./degree-cert-request.component.scss'],
})
export class DegreeCertRequestComponent {
  @ViewChild('stepper') private stepper?: MatStepper;
  id?: string;
  requestNo = '';
  date = thaiDate(new Date());

  step1DegreeType!: string;

  step1Form: any = this.fb.group({
    step1: [],
  });
  step2Form: any = this.fb.group({
    step2: [
      {
        plans: [],
      },
    ],
  });
  step3Form: any = this.fb.group({
    step3: [],
  });
  step4Form: any = this.fb.group({
    step4: [],
  });
  uniData: any;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private uniInfoService: UniInfoService,
    private uniRequestService: UniRequestService,
    private activatedRoute: ActivatedRoute,
    private cdref: ChangeDetectorRef
  ) {
    this.initForm();
  }

  async initForm() {
    this.id = this.activatedRoute.snapshot.queryParams['id'];
    let uniRequestDegree;
    this.uniData = await lastValueFrom(
      this.uniInfoService.univerSitySelectById(getCookie('uniId'))
    );

    if (this.id) {
      uniRequestDegree = await lastValueFrom(
        this.uniInfoService.uniRequestDegreeCertSelectById(this.id)
      );
      console.log(uniRequestDegree)
      const { requestNo, step1, step2, step3, step4 } =
        this.uniInfoService.mappingUniverSitySelectByIdWithForm(
          uniRequestDegree
        );
      this.requestNo = requestNo;
      this.step1Form.setValue({
        step1,
      });
      this.step2Form.setValue({
        step2,
      });
      this.step3Form.setValue({
        step3,
      });
      if (step4)
        this.step4Form.setValue({
          step4,
        });
    } else {
      this.step1Form.setValue({
        step1: {
          institutionsCode: this.uniData?.universitycode || '',
          institutionsGroup: getCookie('uniType') || '',
          institutionsName: this.uniData?.name + (this.uniData?.campusname ? `, ${this.uniData?.campusname}` : '') || '',
          provience: this.uniData?.provinceid || '',
        },
      });
    }
  }
  navigateBack() {
    this.router.navigate(['/', 'degree-cert']);
  }

  save(process: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่?`,
        subTitle: `คุณยืนยันข้อมูลและส่งเรื่องเพื่อขออนุมัติ
        ใช่หรือไม่`,
        btnLabel: 'ยืนยัน',
      },
    });

    dialogRef.componentInstance.confirmed.subscribe(async (e) => {
      if (e) {
        const res = await (async () => {
          if (this.id)
            return await lastValueFrom(
              this.uniRequestService.uniRequestUpdate(this._getRequest(process))
            );
          return await lastValueFrom(
            this.uniRequestService.uniRequestInsert(this._getRequest(process))
          );
        })();

        if (res?.returncode == 99) return;
        this.showConfirmDialog(res?.requestno);
      }
    });
  }
  private _getRequest(process: string): any {
    const step1: any = this.step1Form.value.step1;
    const step2: any = this.step2Form.value.step2;
    const step3: any = this.step3Form.value.step3;
    const step4: any = this.step4Form.value.step4;

    const reqBody: any = {
      uniid: getCookie('uniId'),
      ref1: '3',
      ref2: '03',
      ref3: '5',
      requestprocess: process,
      requeststatus: '1',
      systemtype: '3',
      requesttype: '3',
      subtype: '5',

      attachfiles: step4 ? JSON.stringify(step4?.files) : null,
      uniname: step1?.institutionsName
        ? `${step1?.institutionsName}, ${this.uniData?.campusname}`
        : null,
      unitype: step1?.institutionsGroup || null,
      uniprovince: step1?.provience || null,
      unicode: step1?.institutionsCode || null,
      degreelevel: step1?.degreeTypeForm?.degreeType || null,
      courseacademicyear: step1?.degreeTypeForm?.courseYear || null,
      coursename: step1?.degreeTypeForm?.courseName || null,
      coursetype: step1?.degreeTypeForm?.courseType || null,
      coursestatus: step1?.degreeTypeForm?.courseStatus || null,
      fulldegreenameth: step1?.degreeTypeForm?.degreeNameThFull || null,
      shortdegreenameth: step1?.degreeTypeForm?.degreeNameThShort || null,
      fulldegreenameen: step1?.degreeTypeForm?.degreeNameEnFull || null,
      shortdegreenameen: step1?.degreeTypeForm?.degreeNameEnShort || null,
      courseapprovetime: step1?.degreeTypeForm?.courseApproveTime || null,
      courseapprovedate: step1?.degreeTypeForm?.courseApproveDate
        ? formatDate(
            new Date(step1?.degreeTypeForm?.courseApproveDate).toISOString()
          )
        : null,
      courseacceptdate: step1?.degreeTypeForm?.courseAcceptDate
        ? formatDate(
            new Date(step1?.degreeTypeForm?.courseAcceptDate).toISOString()
          )
        : null,
      coursedetailtype: step1?.courseDetailType || null,
      coursedetailinfo: step1?.courseDetail
        ? JSON.stringify(step1?.courseDetail)
        : null,
      teachinglocation: step1?.locations
        ? JSON.stringify(step1?.locations)
        : null,
      responsibleunit: step1?.institutions
        ? JSON.stringify(step1?.institutions)
        : null,
      evaluatelocation: step1?.locations2
        ? JSON.stringify(step1?.locations2)
        : null,
      coordinatorinfo: step1?.coordinator
        ? JSON.stringify(step1?.coordinator)
        : null,
      courseteacher: step2?.teacher?.teachers
        ? JSON.stringify(step2?.teacher?.teachers)
        : null,
      courseinstructor: step2?.nitet?.nitets
        ? JSON.stringify(step2?.nitet?.nitets)
        : null,
      courseadvisor: step2?.advisor?.advisors
        ? JSON.stringify(step2?.advisor?.advisors)
        : null,
      processtrainning: step3?.training?.rows
        ? JSON.stringify(step3?.training?.rows)
        : null,
      processteaching: step3?.teaching?.rows
        ? JSON.stringify(step3?.teaching?.rows)
        : null,
      tokenkey: getCookie('userToken') || null,
    };
    if (['a', 'b', 'c'].includes(this.step1DegreeType)) {
      reqBody['coursestructure'] = step2?.plan1?.plans
        ? JSON.stringify(step2?.plan1?.plans)
        : null;

      reqBody['courseplan'] = step2?.plan1?.subjects
        ? JSON.stringify(step2?.plan1?.subjects)
        : null;
    } else {
      reqBody['coursestructure'] = step2?.plan2?.plans
        ? JSON.stringify(step2?.plan2?.plans)
        : null;
      reqBody['courseplan'] = step2?.plan2?.subjects
        ? JSON.stringify(step2?.plan2?.subjects)
        : null;
    }
    if (this.id) {
      reqBody['id'] = this.id;
    }
    return reqBody;
  }
  showConfirmDialog(requestno?: string) {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '375px',
      data: {
        header: 'ยืนยันข้อมูลสำเร็จ',
        content: `วันที่ : ${this.date}
        เลขที่ใบคำขอ : ${requestno || this.requestNo || '-'}`,
        subContent: `กรุณาตรวจสอบสถานะใบคำขอหรือรหัสเข้าใช้งาน
        ผ่านทางอีเมลผู้ที่ลงทะเบียนภายใน 3 วันทำการ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.navigateBack();
      }
    });
  }
  goBack() {
    this.stepper?.previous();
  }

  goForward() {
    this.stepper?.next();
  }
}
