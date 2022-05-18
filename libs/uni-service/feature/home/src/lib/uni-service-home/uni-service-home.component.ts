import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

export interface DegreeInfo {
  order: number;
  degreeId: string;
  uniName: string;
  course: string;
  major: string;
  degreeName: string;
  educationLevel: string;
}

export const data: DegreeInfo[] = [
  {
    order: 1,
    degreeId: '069784',
    uniName: 'มหาวิทยาลัยราชภัฏพระนครศรีอยุธยา',
    course: 'การศึกษาบัณฑิต สาขาวิชาเคมี หลักสูตรปรับปรุง พ.ศ.2562',
    major: 'วิทยาศาสตร์พื้นฐาน',
    degreeName: 'วิทยาศาสตร์บัณฑิต',
    educationLevel: 'ปริญญาตรีทางการศึกษา (หลักสูตร 4 ปี)',
  },
  {
    order: 2,
    degreeId: '069784',
    uniName: 'มหาวิทยาลัยราชภัฏพระนครศรีอยุธยา',
    course: 'พัฒนาครูโครงงานคุณธรรม',
    major: 'ศึกษาศาสตร์',
    degreeName: 'การศึกษาบัณฑิต',
    educationLevel: 'ปริญญาตรีทางการศึกษา (หลักสูตร 4 ปี)',
  },
  {
    order: 2,
    degreeId: '069784',
    uniName: 'มหาวิทยาลัยราชภัฏพระนครศรีอยุธยา',
    course: 'การออกแบบการจัดการเรียนรู้บนพื้นฐานเทคโนโลยี',
    major: 'เทคโนโลยีสารสนเทศ',
    degreeName: 'ศิลปศาสตร์บัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์',
    educationLevel: 'ปริญญาตรีทางการศึกษา (หลักสูตร 4 ปี)',
  },
];

@Component({
  selector: 'uni-service-home',
  templateUrl: './uni-service-home.component.html',
  styleUrls: ['./uni-service-home.component.css'],
})
export class UniServiceHomeComponent {
  data: DegreeInfo[] = [];
  constructor(public dialog: MatDialog) {}

  search() {
    this.data = data;
  }

  clear() {
    this.data = [];
  }
}
