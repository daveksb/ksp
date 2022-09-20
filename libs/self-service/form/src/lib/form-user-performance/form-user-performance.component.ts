import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'self-service-form-user-performance',
  templateUrl: './form-user-performance.component.html',
  styleUrls: ['./form-user-performance.component.css'],
})
export class FormUserPerformanceComponent implements OnInit {
  typesOfSubject: string[] = [
    'วิชาชีพครู',
    'วิชาภาษาไทยเพื่อการสื่อสาร',
    'วิชาภาษาอังกฤษเพื่อการสื่อสาร',
    'วิชาการใช้เทคโนโลยีเพื่อการศึกษา',
  ];
  personSelected = false;

  performanceFiles = performanceFiles;

  ngOnInit(): void {}
}

const performanceFiles = [
  {
    name: 'สำเนาผลการทดสอบ',
    fileId: '',
  },
];
