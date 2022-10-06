import { Component } from '@angular/core';
import { AttachFile } from '@ksp/shared/constant';

@Component({
  selector: 'self-service-form-user-performance',
  templateUrl: './form-user-performance.component.html',
  styleUrls: ['./form-user-performance.component.css'],
})
export class FormUserPerformanceComponent {
  typesOfSubject: string[] = [
    'วิชาชีพครู',
    'วิชาภาษาไทยเพื่อการสื่อสาร',
    'วิชาภาษาอังกฤษเพื่อการสื่อสาร',
    'วิชาการใช้เทคโนโลยีเพื่อการศึกษา',
  ];
  personSelected = false;

  performanceFiles: AttachFile[] = [
    {
      name: 'สำเนาผลการทดสอบ',
      files: [],
    },
  ];
}
