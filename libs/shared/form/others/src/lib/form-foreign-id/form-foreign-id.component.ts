import { Component, Input } from '@angular/core';
import { FormMode } from '@ksp/shared/interface';

@Component({
  selector: 'ksp-form-foreign-id',
  templateUrl: './form-foreign-id.component.html',
  styleUrls: ['./form-foreign-id.component.scss'],
})
export class FormForeignIdComponent {
  @Input() mode: FormMode = 'edit';
  
  foreignInfo = ['1.สำเนาหนังสือเดินทาง'];
}
