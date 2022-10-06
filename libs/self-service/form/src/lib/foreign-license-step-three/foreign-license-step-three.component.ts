import { Component, Input } from '@angular/core';

@Component({
  selector: 'self-service-foreign-license-step-three',
  templateUrl: './foreign-license-step-three.component.html',
  styleUrls: ['./foreign-license-step-three.component.scss'],
})
export class ForeignLicenseStepThreeComponent {
  @Input() documentTypes: 'request' | 'renew' = 'request';
  @Input() uniqueTimestamp = '';
  @Input() attachFiles: any[] = [];

  updateComplete(file: any, group: any) {
    const { fileId, fileName } = file;
    group.fileId = fileId;
    group.fileName = fileName;
  }
}
