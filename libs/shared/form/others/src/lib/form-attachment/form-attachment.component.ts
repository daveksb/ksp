import { Component, Input } from '@angular/core';
import { FormMode } from '@ksp/shared/interface';

@Component({
  selector: 'ksp-form-attachment',
  templateUrl: './form-attachment.component.html',
  styleUrls: ['./form-attachment.component.scss'],
})
export class FormAttachmentComponent {
  @Input() title = `กรุณาแนบหลักฐานประกอบ`;
  @Input() groups: string[] = [];
  @Input() mode: FormMode = 'edit';
}
