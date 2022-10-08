import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'self-service-foreign-license-step-three',
  templateUrl: './foreign-license-step-three.component.html',
  styleUrls: ['./foreign-license-step-three.component.scss'],
})
export class ForeignLicenseStepThreeComponent implements OnInit {
  @Input() documentTypes: 'request' | 'renew' = 'request';
  @Input() uniqueTimestamp = '';
  @Input() attachFiles: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  updateComplete(file: any, group: any) {
    const { fileid, filename } = file;
    group.fileid = fileid;
    group.filename = filename;
  }
}
