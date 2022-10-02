import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';

import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { UniInfoService, UniRequestService } from '@ksp/shared/service';
import { getCookie, thaiDate, parseJson } from '@ksp/shared/utility';
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

  step1DegreeType = '';

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
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private uniInfoService: UniInfoService,
    private uniRequestService: UniRequestService,
    private activatedRoute: ActivatedRoute
  ) {
    this.initForm();
  }
  async initForm() {
    this.id = this.activatedRoute.snapshot.queryParams['id'];
    let uniRequestDegree;
    const uniData = await lastValueFrom(
      this.uniInfoService.univerSitySelectById(getCookie('uniType'))
    );
    if (this.id) {
      uniRequestDegree = await lastValueFrom(
        this.uniInfoService.uniRequestDegreeCertSelectById(this.id)
      );
      this._mappingResponseWithForm(uniRequestDegree, uniData);
    } else {
      this.step1Form.setValue({
        step1: {
          institutionsCode: uniData?.universitycode || '',
          institutionsGroup: getCookie('uniType') || '',
          institutionsName: uniData?.name || '',
          provience: uniData?.provinceid || '',
        },
      });
    }
  }
  navigateBack() {
    this.router.navigate(['/', 'degree-cert']);
  }

  save() {
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
              this.uniRequestService.uniRequestUpdate(this._getRequest())
            );
          return await lastValueFrom(
            this.uniRequestService.uniRequestInsert(this._getRequest())
          );
        })();

        if (res?.returncode == 99) return;
        this.showConfirmDialog(res?.requestno);
      }
    });
  }
  private toDate(sDate: any) {
    return sDate ? moment(sDate).format('yyyy-MM-DD') : '';
  }
  private _mappingResponseWithForm(res: any, uniData: any): any {
    this.requestNo = res?.requestno ?? '';
    this.step1Form.setValue({
      step1: {
        institutionsCode: uniData?.universitycode || '',
        institutionsGroup: getCookie('uniType') || '',
        institutionsName: uniData?.name || '',
        provience: uniData?.provinceid || '',
        courseDetailType: res?.coursedetailtype,
        degreeTypeForm: {
          degreeType: res?.degreelevel,
          courseYear: res?.courseacademicyear,
          courseName: res?.coursename,
          courseType: res?.coursetype,
          courseStatus: res?.coursestatus,
          degreeNameThFull: res?.fulldegreenameth,
          degreeNameThShort: res?.shortdegreenameth,
          degreeNameEnFull: res?.fulldegreenameen,
          degreeNameEnShort: res?.shortdegreenameen,
          courseApproveTime: res?.courseapprovetime,
          courseApproveDate: this.toDate(res?.courseapprovedate),
          courseAcceptDate: this.toDate(res?.courseacceptdate),
        },
        //type json
        locations: res?.teachinglocation
          ? parseJson(res?.teachinglocation)
          : null,
        institutions: res?.responsibleunit
          ? parseJson(res?.responsibleunit)
          : null,
        locations2: res?.evaluatelocation
          ? parseJson(res?.evaluatelocation)
          : null,
        coordinator: res?.coordinatorinfo
          ? parseJson(res?.coordinatorinfo)
          : null,
      },
    });
    this.step2Form.setValue({
      step2: {
        plan1: {
          plans: res.coursestructure ? parseJson(res.coursestructure) : [],
          subjects: res.courseplan ? parseJson(res.courseplan) : [],
        },
        teacher: {
          teachers: res.courseteacher ? parseJson(res.courseteacher) : [],
        },

        nitet: {
          nitets: res.courseinstructor ? parseJson(res.courseinstructor) : [],
        },
        advisor: {
          advisors: res.courseadvisor ? parseJson(res.courseadvisor) : [],
        },
      },
    });

    this.step3Form.setValue({
      step3: {
        training: {
          rows: res.processtrainning ? parseJson(res.processtrainning) : [],
        },
        teaching: {
          rows: res.processteaching ? parseJson(res.processteaching) : [],
        },
      },
    });
    if (res?.attachfiles)
      this.step4Form.setValue({
        step4: {
          files: parseJson(res?.attachfiles),
        },
      });
  }
  private _getRequest(): any {
    const step1: any = this.step1Form.value.step1;
    const step2: any = this.step2Form.value.step2;
    const step3: any = this.step3Form.value.step3;
    const step4: any = this.step4Form.value.step4;

    const reqBody: any = {
      uniid: getCookie('uniId'),
      ref1: '3',
      ref2: '03',
      ref3: '5',
      requestprocess: '1',
      requeststatus: '1',
      systemtype: '3',
      requesttype: '3',
      subtype: '5',

      attachfiles: step4 ? JSON.stringify(step4?.files) : null,
      uniname: step1?.institutionsName || null,
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
      courseapprovedate: step1?.degreeTypeForm?.courseApproveDate || null,
      courseacceptdate: step1?.degreeTypeForm?.courseAcceptDate || null,
      coursedetailtype: step1?.courseDetailType || null,
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
      coursestructure: step2?.plan1?.plans
        ? JSON.stringify(step2?.plan1?.plans)
        : null,
      courseplan: step2?.plan1?.subjects
        ? JSON.stringify(step2?.plan1?.subjects)
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
