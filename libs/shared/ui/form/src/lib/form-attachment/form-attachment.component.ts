import { Component, Input } from '@angular/core';

@Component({
  selector: 'ksp-form-attachment',
  templateUrl: './form-attachment.component.html',
  styleUrls: ['./form-attachment.component.scss'],
})
export class FormAttachmentComponent {
  @Input() title = `กรุณาแนบหลักฐานประกอบ`;
  @Input() groups: string[] = [
    'หนังสือแต่งตั้งผู้ประสานงาน',
    'สำเนาบัตรประชาชน',
  ];
}
