import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

export interface University {
  uniCode: string;
  uniName: string;
  address: string;
  organization: string;
}

export const data = [
  {
    uniCode: '000009',
    uniName: 'วิทยาลัยเทคโนโลยีและอุตสาหกรรม การต่อเรือหนองคาย',
    address:
      '174 หมู่ 1 ซอย 2 ถนนแก้ววรวุฒิ ตำบลมีชัย อำเภอเมืองหนองคาย จังหวัดหนองคาย 43000',
    organization: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
  },
  {
    uniCode: '001597',
    uniName: 'วิทยาลัยเทคนิคฉะเชิงเทรา',
    address:
      '12 ถนนมหาจักรพรรด ตำบลหน้าเมือง อำเภอเมืองฉะเชิงเทรา จังหวัดฉะเชิงเทรา 24000',
    organization: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
  },
  {
    uniCode: '001601',
    uniName: 'วิทยาลัยอาชีวศึกษาชลบุรี',
    address: '388 ม.5 ต.บ้านสวน อ.เมือง จ.ชลบุรี 20000',
    organization: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
  },
  {
    uniCode: '001611',
    uniName: 'วิทยาลัยเทคนิคนครปฐม',
    address: '2 ถนนเพชรเกษม ตำบลพระประโทน อำเภอเมือง จังหวัดนครปฐม 73000',
    organization: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
  },
  {
    uniCode: '001621',
    uniName: 'วิทยาลัยเทคนิคหนองบัวลําภู',
    address:
      '102 หมู่ 3 ตำบลโพธิ์ชัย อำเภอเมืองหนองบัวลำภู จังหวัดหนองบัวลำภู 39000',
    organization: 'สำนักงานคณะกรรมการการ อาชีวศึกษา',
  },
];

export type SearchType = 'uni' | 'school';

@Component({
  selector: 'ksp-university-search',
  templateUrl: './university-search.component.html',
  styleUrls: ['./university-search.component.css'],
})
export class UniversitySearchComponent implements OnInit {
  @Input() searchType: SearchType = 'school';
  @Output() confirmed = new EventEmitter<string>();

  selectedUniversity = '';

  data: University[] = [];
  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.data = [];
  }

  onItemChange(universityCode: string) {
    this.selectedUniversity = universityCode;
    console.log('universityCode = ', universityCode);
  }

  search() {
    this.data = data;
  }

  clear() {
    this.data = [];
  }
}
