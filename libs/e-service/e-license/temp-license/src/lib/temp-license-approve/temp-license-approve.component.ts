import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SchoolRequestSubType, SchoolLangMapping } from '@ksp/shared/constant';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
  PdfRenderComponent,
} from '@ksp/shared/dialog';
import { KspApprovePayload, KspRequest } from '@ksp/shared/interface';
import { ERequestService } from '@ksp/shared/service';
import {
  changeToEnglishMonth,
  changeToThaiNumber,
  getCookie,
  thaiDate,
} from '@ksp/shared/utility';
import moment from 'moment';

@Component({
  selector: 'e-service-temp-license-approve',
  templateUrl: './temp-license-approve.component.html',
  styleUrls: ['./temp-license-approve.component.scss'],
})
export class TempLicenseApproveComponent implements OnInit {
  kspRequest = new KspRequest();
  approveHistory: any[] = [];
  approveInfo!: any;

  form = this.fb.group({
    approvement: [],
  });

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private requestService: ERequestService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.getApproveHistory(`${id}`);
        this.requestService.getKspRequestById(id).subscribe((res) => {
          this.kspRequest = res;
          console.log('element = ', res);
        });
      }
    });
    this.getLicenseNo();

    //this.genPdf(this.kspRequest);
  }

  genPdf(element: any) {
    const position = element?.position;
    const startDate = new Date();
    const date = new Date();
    const thai = thaiDate(date);
    const [day, month, year] = thai.split(' ');
    const [eday, emonth, eyear] = thai.split(' ');
    const endDate = eday + ' ' + emonth + ' ' + `${parseInt(eyear) + 2}`;
    const fulldateth = `${changeToThaiNumber(day)} เดือน ${month} พ.ศ. ${year}`;
    const fulldateen = `${day} Day of ${changeToEnglishMonth(month)} B.E. ${
      parseInt(year) - 543
    }`;
    const name = element.firstnameth + ' ' + element.lastnameth;
    const nameen = element.firstnameen + ' ' + element.lastnameen;
    const start = thaiDate(startDate);
    const end = endDate;
    const startth = changeToThaiNumber(start);
    const endth = changeToThaiNumber(end);
    const starten = changeToEnglishMonth(start);
    const enden = changeToEnglishMonth(end);
    const careertype = SchoolRequestSubType[+(element?.licensetype ?? '1')];
    const careertypeen = SchoolLangMapping[careertype ?? 'ครู'] ?? '';

    const prefix = element.licensetype == '1' ? 'ท.' : 'อ.';
    //const schoolid = element.schoolId;
    const schoolname = element.schoolname;
    const bureauname = element.bureauname;
    const schoolapprovename = 'ผู้อํานวยการสถานศึกษา';
    const schoolapprovenameen = 'director of the educational institution';

    this.requestService.getLicenseNoTh().subscribe((res) => {
      const be = moment().add(543, 'year').year();
      const requestno = `${res.runningno}/${be}`;

      this.dialog.open(PdfRenderComponent, {
        width: '1200px',
        height: '100vh',
        data: {
          pdfType: 1,
          pdfSubType: 3,
          input: {
            prefix,
            schoolapprovename,
            schoolapprovenameen,
            requestno,
            careertype,
            careertypeen,
            name,
            nameen,
            startth,
            endth,
            starten,
            enden,
            schoolname,
            bureauname,
            day,
            month,
            year,
            position,
            fulldateth,
            fulldateen,
          },
        },
      });
    });
  }

  getLicenseNo() {
    this.requestService.getLicenseNoTh().subscribe((res) => {
      const be = moment().add(543, 'year').year();
      //console.log('call get license no = ', res.runningno);
      this.approveInfo = {
        approveNo: `${res.runningno}/${be}`,
        approveDate: new Date(),
      };
      this.form.controls.approvement.patchValue(this.approveInfo);
    });
  }

  cancel() {
    this.router.navigate(['/temp-license', 'list']);
  }

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยืนยันข้อมูล
        ใช่หรือไม่? `,
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        //this.onCompleted();
        this.submitApi();
      }
    });
  }

  getApproveHistory(requestid: string) {
    this.requestService.getApproveHistory(requestid).subscribe((res) => {
      this.approveHistory = res;
      if (res && res.length) {
        this.approveHistory = this.approveHistory.map((h: any) => {
          return { ...h, ...{ detail: JSON.parse(h.detail) } };
        });
      }
    });
  }

  mapCheckResult(result: string) {
    //console.log('result = ', result);
    if (result === '1') return 'ครบถ้วน และถูกต้อง';
    if (result === '2') return 'ขอแก้ไข / เพิ่มเติม';
    if (result === '3') return 'ขาดคุณสมบัติ';
    else return '';
  }

  submitApi() {
    const form: any = this.form.controls.approvement.value;
    console.log('form  check= ', form);
    const detail = {
      checkresult: form.result,
      checkdetail: {
        approveNo: form.approveNo,
        approveDate: form.approveDate,
      },
    };

    const payload: KspApprovePayload = {
      requestid: this.kspRequest.id,
      process: `5`,
      status: `2`,
      detail: JSON.stringify(detail),
      systemtype: '4', // e-service
      userid: getCookie('userId'),
      paymentstatus: null,
    };

    //console.log('payload = ', payload);
    this.requestService.KspUpdateRequestProcess(payload).subscribe(() => {
      this.onCompleted();
    });
  }

  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '375px',
      data: {
        header: `บันทึกข้อมูลสำเร็จ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/temp-license', 'list']);
      }
    });
  }
}
