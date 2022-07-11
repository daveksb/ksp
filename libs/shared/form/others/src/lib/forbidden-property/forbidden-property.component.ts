import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { FileUploadComponent } from '@ksp/shared/form/file-upload';
import { FormMode } from '@ksp/shared/interface';

@Component({
  templateUrl: './forbidden-property.component.html',
  styleUrls: ['./forbidden-property.component.scss'],
  standalone: true,
  imports: [MatDialogModule, FileUploadComponent],
})
export class ForbiddenPropertyFormComponent {
  @Input()
  title = `ขอรับรองว่าไม่เป็นผู้มีลักษณะต้องห้ามตามที่กำหนดไว้ในมาตรา 44
  แห่งพระราชบัญญัติสภาครูและบุคลากรทางการศึกษา พ.ศ.2546`;

  @Input() mode: FormMode = 'edit';

  @Output() confirmed = new EventEmitter<boolean>();

  save() {
    this.confirmed.emit(true);
  }
}
