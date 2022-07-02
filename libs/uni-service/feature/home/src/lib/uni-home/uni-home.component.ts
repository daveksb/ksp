import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  templateUrl: './uni-home.component.html',
  styleUrls: ['./uni-home.component.css'],
})
export class UniHomeComponent {
  form = this.fb.group({
    homeSearch: [],
  });

  constructor(private fb: FormBuilder) {}

  displayedColumns: string[] = [
    'order',
    'degreeId',
    'uniName',
    'course',
    'major',
    'degreeName',
    'educationLevel',
  ];
  dataSource = new MatTableDataSource<DegreeInfo>();

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }
}

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
