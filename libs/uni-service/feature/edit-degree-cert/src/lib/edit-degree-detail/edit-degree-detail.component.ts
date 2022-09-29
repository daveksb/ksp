import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { getCookie, parseJson } from '@ksp/shared/utility';
import moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { UniInfoService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-edit-degree-detail',
  templateUrl: './edit-degree-detail.component.html',
  styleUrls: ['./edit-degree-detail.component.scss'],
})
export class EditDegreeDetailComponent implements OnInit {
  step1DegreeType = '';
  requestNo = '';
  id?: string;
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
    private activatedRoute: ActivatedRoute,
    private uniInfoService: UniInfoService,

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
  back() {
    this.router.navigate(['/', 'edit-degree-cert']);
  }

  ngOnInit(): void {}

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

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.showConfirmDialog();
      }
    });
  }

  showConfirmDialog() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '375px',
      data: {
        header: 'ยืนยันข้อมูลสำเร็จ',
        content: `วันที่ : 12 มกราคม 2565?
        เลขที่ใบคำขอ : UNIUS 6406000162`,
        subContent: `กรุณาตรวจสอบสถานะใบคำขอหรือรหัสเข้าใช้งาน
        ผ่านทางอีเมลผู้ที่ลงทะเบียนภายใน 3 วันทำการ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.back();
      }
    });
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

  private toDate(sDate: any) {
    return sDate ? moment(sDate).format('yyyy-MM-DD') : '';
  }
}
