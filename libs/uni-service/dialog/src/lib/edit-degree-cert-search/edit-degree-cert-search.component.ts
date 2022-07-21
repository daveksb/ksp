import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'uni-service-edit-degree-cert-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-degree-cert-search.component.html',
  styleUrls: ['./edit-degree-cert-search.component.scss'],
})
export class EditDegreeCertSearchComponent implements OnInit {
  constructor() {}

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
    
  }
}

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
