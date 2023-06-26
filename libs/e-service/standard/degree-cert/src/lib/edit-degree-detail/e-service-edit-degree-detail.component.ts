import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import {
  formatDate,
  getCookie,
  jsonStringify,
  parseJson,
  thaiDate,
} from '@ksp/shared/utility';
import moment from 'moment';
import { lastValueFrom, Subject, switchMap } from 'rxjs';
import {
  ERequestService,
  EUniService,
  LoaderService,
  UniRequestService,
} from '@ksp/shared/service';
import { MatStepper } from '@angular/material/stepper';
import _ from 'lodash';

@Component({
  selector: 'e-service-edit-degree-detail',
  templateUrl: './e-service-edit-degree-detail.component.html',
  styleUrls: ['./e-service-edit-degree-detail.component.scss'],
})
export class EserviceEditDegreeDetailComponent {
  @ViewChild('stepper') private stepper?: MatStepper;

  step1DegreeType = '';
  requestNo = '';
  requestId = '';

  id?: string;
  deftBeforeEdit: any;
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
  verifyForm: any = this.fb.group({
    verify: []
  })
  date = thaiDate(new Date());
  choices = [
    { name: 'อนุมัติ', value: 3 },
    { name: 'ไม่อนุมัติ', value: 4 },
  ];
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  draftRequest: any;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private uniRequestService: EUniService,
    private loaderService: LoaderService,
    private eRequestService: ERequestService,
  ) {
    this.initForm();
  }
  async initForm() {
    this.id = this.activatedRoute.snapshot.params['id'];
    let uniRequestDegree;
    // if (!this.id) return this.back();
    console.log(this.id)
    if (this.id) {
      uniRequestDegree = await lastValueFrom(
        this.uniRequestService.uniRequestDegreeCertSelectById(this.id)
      );
      this.draftRequest = uniRequestDegree;
      this._mappingResponseWithForm(uniRequestDegree);
    }
  }
  back() {
    this.router.navigate(['/', 'edit-degree-cert']);
  }

  save(saveType: any) {
    const detail: any = _.pick(this.verifyForm.value, ['verify']);
    console.log(detail)
    if (!this.requestId || !this.id) return;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่?`,
        subTitle: `คุณยืนยันข้อมูลและส่งเรื่องเพื่อขออนุมัติ
        ใช่หรือไม่`,
        btnLabel: 'ยืนยัน',
      },
    });

    dialogRef.componentInstance.confirmed
      .pipe(
        switchMap(() => {
          return this.uniRequestService.updateDegreecert(this._getRequest());
        })
      )
      .subscribe((res) => {
        if (res) {
          const detail: any = _.pick(this.verifyForm.value, ['verify']);
          console.log(detail)
          const payload: any = {
            systemtype: '3',
            requestid: this.draftRequest?.requestid,
            userid: getCookie('userId'),
            process: '1',
          };
          payload.status = detail?.verify?.result;
          payload.detail = jsonStringify({
            ...detail,
            approvedate: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
          });
          this.eRequestService
          .kspUpdateRequestUniRequestDegree(payload)
          .subscribe(() => {
            this.showConfirmDialog();
          });
        }
      });
  }

  showConfirmDialog(requestno?: string) {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '375px',
      data: {
        header: 'ยืนยันข้อมูลสำเร็จ',
        content: `วันที่ : ${this.date}
        เลขที่แบบคำขอ : ${requestno || this.requestNo || '-'}`,
        subContent: `กรุณาตรวจสอบสถานะแบบคำขอหรือรหัสเข้าใช้งาน
        ผ่านทางอีเมลผู้ที่ลงทะเบียนภายใน 3 วันทำการ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'degree-cert', 'list-edit-request']);
      }
    });
  }
  private _mappingResponseWithForm(res: any) {
    this.requestNo = res?.requestno ?? '';
    this.requestId = res?.requestid;
    const { formchange } = parseJson(res.checkresult);
    this.step1Form.setValue({
      step1: {
        institutionsCode: res?.unicode || '',
        institutionsGroup: res?.unitype || '',
        institutionsName: res?.uniname || '',
        provience: res?.uniprovince || '',
        courseDetailType: res?.coursedetailtype,
        courseDetail: res?.coursedetailinfo
          ? parseJson(res?.coursedetailinfo)
          : null,
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
        section1: formchange?.step1?.section1 ?? false,
        section2: formchange?.step1?.section2 ?? false,
        section3: formchange?.step1?.section3 ?? false,
        section4: formchange?.step1?.section4 ?? false,
        section5: formchange?.step1?.section5 ?? false,
        section6: formchange?.step1?.section6 ?? false,
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
        section1: formchange?.step2?.section1 ?? false,
        section2: formchange?.step2?.section2 ?? false,
        section3: formchange?.step2?.section3 ?? false,
        section4: formchange?.step2?.section4 ?? false,
        section5: formchange?.step2?.section5 ?? false,
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
        section1: formchange?.step3?.section1 ?? false,
        section2: formchange?.step3?.section2 ?? false,
      },
    });
    if (res?.attachfiles)
      this.step4Form.setValue({
        step4: {
          files: parseJson(res?.attachfiles),
        },
      });
    this.deftBeforeEdit = {
      step1: this.step1Form?.value?.step1,
      step2: this.step2Form?.value?.step2,
      step3: this.step3Form?.value?.step3,
      step4: this.step4Form?.value?.step4,
    };
  }
  private _getRequestAllowEdit({ step1, step2, step3 }: any): any {
    const returnData: any = {};
    returnData['step1Section1'] = {
      courseacademicyear: step1?.degreeTypeForm?.courseYear || null,
      courseacceptdate: step1?.degreeTypeForm?.courseAcceptDate
        ? formatDate(
            new Date(step1?.degreeTypeForm?.courseAcceptDate).toISOString()
          )
        : null,
      courseapprovedate: step1?.degreeTypeForm?.courseApproveDate
        ? formatDate(
            new Date(step1?.degreeTypeForm?.courseApproveDate).toISOString()
          )
        : null,
      courseapprovetime: step1?.degreeTypeForm?.courseApproveTime || null,
      coursename: step1?.degreeTypeForm?.courseName || null,
      coursetype: step1?.degreeTypeForm?.courseType || null,
      degreelevel: step1?.degreeTypeForm?.degreeType || null,
      fulldegreenameth: step1?.degreeTypeForm?.degreeNameThFull || null,
      shortdegreenameth: step1?.degreeTypeForm?.degreeNameThShort || null,
      fulldegreenameen: step1?.degreeTypeForm?.degreeNameEnFull || null,
      shortdegreenameen: step1?.degreeTypeForm?.degreeNameEnShort || null,
      coursestatus: step1?.degreeTypeForm?.courseStatus || null,
    };
    returnData['step1Section2'] = {
      coursedetailtype: step1?.courseDetailType || null,
      coursedetailinfo: step1?.courseDetail
        ? JSON.stringify(step1?.courseDetail)
        : null,
    };
    returnData['step1Section3'] = {
      teachinglocation: step1?.locations
        ? JSON.stringify(step1?.locations)
        : null,
    };
    returnData['step1Section4'] = {
      responsibleunit: step1?.institutions
        ? JSON.stringify(step1?.institutions)
        : null,
    };

    returnData['step1Section5'] = {
      evaluatelocation: step1?.locations2
        ? JSON.stringify(step1?.locations2)
        : null,
    };
    returnData['step1Section6'] = {
      coordinatorinfo: step1?.coordinator
        ? JSON.stringify(step1?.coordinator)
        : null,
    };

    returnData['step2Section1'] = {
      ...(() => {
        const reqBody: any = {};
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
        return reqBody;
      })(),
    };

    returnData['step2Section2'] = {
      courseteacher: step2?.teacher?.teachers
        ? JSON.stringify(step2?.teacher?.teachers)
        : null,
    };

    returnData['step2Section3'] = {
      courseinstructor: step2?.nitet?.nitets
        ? JSON.stringify(step2?.nitet?.nitets)
        : null,
    };

    returnData['step2Section4'] = {
      courseadvisor: step2?.advisor?.advisors
        ? JSON.stringify(step2?.advisor?.advisors)
        : null,
    };
    returnData['step3Section1'] = {
      processtrainning: step3?.training?.rows
        ? JSON.stringify(step3?.training?.rows)
        : null,
    };
    returnData['step3Section2'] = {
      processteaching: step3?.teaching?.rows
        ? JSON.stringify(step3?.teaching?.rows)
        : null,
    };
    return returnData;
  }
  private _getRequest(): any {
    const step1: any = this.step1Form.controls.step1.value;
    const step2: any = this.step2Form.controls.step2.value;
    const step3: any = this.step3Form.controls.step3.value;
    const step4: any = this.step4Form.controls.step4.value;
    const reqBody: any = {
      id: this.draftRequest.unidegreecertid,
      degreeapprovecode: this.draftRequest?.degreeapprovecode || null,
      coursesubjects: this.draftRequest?.coursesubjects || null,
      coursemajor: this.draftRequest?.coursemajor || null,
      requestno: this.draftRequest?.requestno || null,
      requestid: this.draftRequest?.requestid || null,
      requestdate: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
      uniid: this.draftRequest?.uniid || null,
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
    if (['1', '2', '3', '4'].includes(this.draftRequest?.degreelevel)) {
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
        ? JSON.stringify({
          subjects: step2?.plan2?.subjects, 
          subjectgroupname: {
            subject1GroupName: step2?.plan2?.subject1GroupName,
            subject2GroupName: step2?.plan2?.subject2GroupName,
            subject3GroupName: step2?.plan2?.subject3GroupName
          }
        })
        // JSON.stringify(step2?.plan2?.subjects)
        : null;
    }
    return reqBody;
  }
  private toDate(sDate: any) {
    return sDate ? moment(sDate).format('yyyy-MM-DD') : '';
  }
  goBack() {
    this.stepper?.previous();
  }

  goForward() {
    this.stepper?.next();
  }
}
