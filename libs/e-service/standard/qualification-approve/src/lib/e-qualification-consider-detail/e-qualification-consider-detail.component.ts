import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SchoolRequestSubType } from '@ksp/shared/constant';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
  PdfRenderComponent,
} from '@ksp/shared/dialog';
import { KspRequest } from '@ksp/shared/interface';

@Component({
  selector: 'ksp-e-qualification-consider-detail',
  templateUrl: './e-qualification-consider-detail.component.html',
  styleUrls: ['./e-qualification-consider-detail.component.scss'],
})
export class EQualificationConsiderDetailComponent {
  form = this.fb.group({
    result: [],
    licenseNumber: [],
    licenseDate: [],
  });

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  renderLicense(request: KspRequest) {
    const pdfType = 99;
    const pdfSubType = 6;
    const requestno = request.requestno;
    const name = request.firstnameth + ' ' + request.lastnameth;
    const position = request.position;
    const bureauname = request.bureauname;
    const schoolname = request.schoolname;
    const approveresult = request.status;
    const careertype = SchoolRequestSubType[Number(request.careertype)];
    const eduinfo = JSON.parse(request.eduinfo || '');
    //console.log('yyy = ', eduinfo);
    const edu1 = eduinfo.find((item: any) => {
      if (item?.degreeLevel) {
        return item.degreeLevel === 1;
      }
      return false;
    });
    const degreelevel = edu1.degreeName ?? '';
    const degreeof = edu1.degreeName ?? '';
    const degreefrom = edu1.institution ?? '';
    const degreename = edu1.major ?? '';

    this.dialog.open(PdfRenderComponent, {
      width: '1200px',
      height: '100vh',
      data: {
        pdfType,
        pdfSubType,
        input: {
          requestno,
          approveresult,
          name,
          position,
          bureauname,
          schoolname,
          careertype,
          eduinfo,
          degreename,
          degreefrom,
          degreelevel,
          degreeof,
        },
      },
    });
  }

  cancel() {
    this.router.navigate(['/qualification-approve', 'consider-list']);
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
        this.onCompleted();
      }
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
        this.cancel();
      }
    });
  }
}
