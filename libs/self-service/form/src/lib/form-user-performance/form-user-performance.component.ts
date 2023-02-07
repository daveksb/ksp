import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormMode } from '@ksp/shared/interface';

@Component({
  selector: 'self-service-form-user-performance',
  templateUrl: './form-user-performance.component.html',
  styleUrls: ['./form-user-performance.component.css'],
})
export class FormUserPerformanceComponent implements OnInit {
  @Input() uniqueTimestamp = '';
  @Input() performanceFiles: any[] = [];
  @Input() mode: FormMode = 'edit';
  @Input() systemType = '';

  typesOfSubject: string[] = [
    'วิชาชีพครู',
    'วิชาภาษาไทยเพื่อการสื่อสาร',
    'วิชาภาษาอังกฤษเพื่อการสื่อสาร',
    'วิชาการใช้เทคโนโลยีเพื่อการศึกษา',
  ];
  personSelected = false;

  ngOnInit(): void {}
}
