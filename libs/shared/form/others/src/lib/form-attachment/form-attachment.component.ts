import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormMode } from '@ksp/shared/interface';
import { FilesPreviewComponent } from '@ksp/shared/ui/dialog';

@Component({
  selector: 'ksp-form-attachment',
  templateUrl: './form-attachment.component.html',
  styleUrls: ['./form-attachment.component.scss'],
})
export class FormAttachmentComponent {
  @Input() title = `กรุณาแนบหลักฐานประกอบ`;
  @Input() groups: string[] = [];
  @Input() mode: FormMode = 'edit';
  

  constructor(public dialog: MatDialog, private router: Router) {}
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
