import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';
import { Location } from '@angular/common';
import _ from 'lodash';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'e-service-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {
  titles = ['', 'พิจารณาประเมินหลักสูตร', 'พิจารณารับรองหลักสูตร'];

  choices = [
    [],
    [
      { name: 'ผ่านการพิจารณา', value: 1 },
      { name: 'ไม่ผ่านการพิจารณา', value: 2 },
    ],
    [
      { name: "รับรอง", value: 1 },
      { name: "ไม่รับรอง", value: 2 },
      { name: "ให้สถาบันแก้ไข / เพิ่มเติม", value: 3 },
      { name: "ส่งคืน", value: 4 },
      { name: "ยกเลิกการรับรอง", value: 5 },
    ],
  ];
  dataSource: any[] = [];
  processType!: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private location: Location,
    private fb: FormBuilder,
  ) {}
  form = this.fb.group({
    verifyForm: [{}],
    considerationResult:[{}]
  });
  ngOnInit() {
    this.dataSource = _.get(this.location.getState(), 'dataSource', []);
    this.route.paramMap.subscribe((res) => {
      this.processType = Number(res.get('type'));
      //console.log('process type = ', this.processType);
    });
  }

  cancel() {
    this.router.navigate(['./degree-cert', 'list', this.processType]);
  }

  next() {
    this.router.navigate(['./degree-cert']);
  }

  save() {
    console.log(this.form.value)
    // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //   width: '350px',
    //   data: {
    //     title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
    //     subTitle: `คุณยืนยันข้อมูลผลการพิจารณาหลักสูตร
    //     ใช่หรือไม่`,
    //   },
    // });

    // dialogRef.componentInstance.confirmed.subscribe((res) => {
    //   if (res) {
    //     this.router.navigate(['/degree-cert', 'list', this.processType]);
    //   }
    // });
  }
}
