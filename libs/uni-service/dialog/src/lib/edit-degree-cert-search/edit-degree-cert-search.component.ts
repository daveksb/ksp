import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'uni-service-edit-degree-cert-search',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './edit-degree-cert-search.component.html',
  styleUrls: ['./edit-degree-cert-search.component.scss'],
})
export class EditDegreeCertSearchComponent implements OnInit {
  constructor(private router: Router) {}

  selectedUniversity = '';
  Data: University[] = [];

  ngOnInit(): void {}

  onItemChange(universityCode: string) {
    this.selectedUniversity = universityCode;
    //console.log('universityCode = ', universityCode);
  }

  search() {
    this.Data = data;
  }

  clear() {
    this.Data = [];
  }

  confirm() {
    this.router.navigate(['/', 'edit-degree-cert', 'detail']);
  }
}

export interface University {
  approveCode: string;
  degreeLevel: string;
  university: string;
  degreeName: string;
  major: string;
  branch: string;
}

export const data = [
  {
    approveCode: '000009',
    degreeLevel: 'วิทยาลัยเทคโนโลยีและอุตสาหกรรม การต่อเรือหนองคาย',
    university:
      '174 หมู่ 1 ซอย 2 ถนนแก้ววรวุฒิ ตำบลมีชัย อำเภอเมืองหนองคาย จังหวัดหนองคาย 43000',
    degreeName: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
    major: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
    branch: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
  },
  {
    approveCode: '000009',
    degreeLevel: 'วิทยาลัยเทคโนโลยีและอุตสาหกรรม การต่อเรือหนองคาย',
    university:
      '174 หมู่ 1 ซอย 2 ถนนแก้ววรวุฒิ ตำบลมีชัย อำเภอเมืองหนองคาย จังหวัดหนองคาย 43000',
    degreeName: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
    major: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
    branch: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
  },
  {
    approveCode: '000009',
    degreeLevel: 'วิทยาลัยเทคโนโลยีและอุตสาหกรรม การต่อเรือหนองคาย',
    university:
      '174 หมู่ 1 ซอย 2 ถนนแก้ววรวุฒิ ตำบลมีชัย อำเภอเมืองหนองคาย จังหวัดหนองคาย 43000',
    degreeName: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
    major: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
    branch: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
  },
  {
    approveCode: '000009',
    degreeLevel: 'วิทยาลัยเทคโนโลยีและอุตสาหกรรม การต่อเรือหนองคาย',
    university:
      '174 หมู่ 1 ซอย 2 ถนนแก้ววรวุฒิ ตำบลมีชัย อำเภอเมืองหนองคาย จังหวัดหนองคาย 43000',
    degreeName: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
    major: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
    branch: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
  },
  {
    approveCode: '000009',
    degreeLevel: 'วิทยาลัยเทคโนโลยีและอุตสาหกรรม การต่อเรือหนองคาย',
    university:
      '174 หมู่ 1 ซอย 2 ถนนแก้ววรวุฒิ ตำบลมีชัย อำเภอเมืองหนองคาย จังหวัดหนองคาย 43000',
    degreeName: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
    major: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
    branch: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
  },
];
