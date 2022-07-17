import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelfServiceFormModule } from '@ksp/self-service/form';
import { TopNavComponent } from '@ksp/shared/menu';
import { DegreeHomeSearchComponent } from '@ksp/shared/search';

@Component({
  templateUrl: './uni-home.component.html',
  styleUrls: ['./uni-home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SelfServiceFormModule,
    MatTableModule,
    TopNavComponent,
    ReactiveFormsModule,
    DegreeHomeSearchComponent,
  ],
})
export class UniHomeComponent {
  form = this.fb.group({
    homeSearch: [],
  });

  constructor(private fb: FormBuilder) {}

  displayedColumns: string[] = [
    'order',
    'approveNumber',
    'degreeLevel',
    'uniName',
    'degreeName',
    'major',
    'branch',
    'approveDate',
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
  approveNumber: string;
  degreeLevel: string;
  uniName: string;
  degreeName: string;
  major: string;
  branch: string;
  approveDate: string;
}

export const data: DegreeInfo[] = [
  {
    order: 1,
    approveNumber: '00069784',
    degreeLevel: 'ปริญญาตรีทางการศึกษา (หลักสูตร 4 ปี)',
    uniName: 'มหาวิทยาลัยราชภัฏพระนครศรีอยุธยา',
    degreeName: 'การศึกษาบัณฑิต สาขาวิชาเคมี หลักสูตรปรับปรุง พ.ศ.2562',
    major: 'วิทยาศาสตร์พื้นฐาน',
    branch: 'วิทยาศาสตร์บัณฑิต',
    approveDate: '10/10/2565',
  },
  {
    order: 2,
    approveNumber: '00069784',
    degreeLevel: 'ปริญญาตรีทางการศึกษา (หลักสูตร 4 ปี)',
    uniName: 'มหาวิทยาลัยราชภัฏพระนครศรีอยุธยา',
    degreeName: 'การศึกษาบัณฑิต สาขาวิชาเคมี หลักสูตรปรับปรุง พ.ศ.2562',
    major: 'วิทยาศาสตร์พื้นฐาน',
    branch: 'วิทยาศาสตร์บัณฑิต',
    approveDate: '10/10/2565',
  },
  {
    order: 3,
    approveNumber: '00069784',
    degreeLevel: 'ปริญญาตรีทางการศึกษา (หลักสูตร 4 ปี)',
    uniName: 'มหาวิทยาลัยราชภัฏพระนครศรีอยุธยา',
    degreeName: 'การศึกษาบัณฑิต สาขาวิชาเคมี หลักสูตรปรับปรุง พ.ศ.2562',
    major: 'วิทยาศาสตร์พื้นฐาน',
    branch: 'วิทยาศาสตร์บัณฑิต',
    approveDate: '10/10/2565',
  },
];
