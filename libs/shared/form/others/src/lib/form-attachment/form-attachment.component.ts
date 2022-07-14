import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormMode } from '@ksp/shared/interface';
import { FilesPreviewComponent } from '@ksp/shared/dialog';

@Component({
  selector: 'ksp-form-attachment',
  templateUrl: './form-attachment.component.html',
  styleUrls: ['./form-attachment.component.scss'],
})
export class FormAttachmentComponent {
  @Input() title = `กรุณาแนบหลักฐานประกอบ`;
  @Input() titleClass = ``;
  @Input() titleNote = '';
  @Input() groups: string[] = [];
  @Input() mode: FormMode = 'edit';

  constructor(public dialog: MatDialog) {}
  view() {
    const dialogRef = this.dialog.open(FilesPreviewComponent, {
      width: '800px',
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.dialog.closeAll();
      }
    });
  }
}
