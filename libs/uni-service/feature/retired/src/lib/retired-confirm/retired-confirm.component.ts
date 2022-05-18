import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RetiredCompleteComponent } from '../retired-complete/retired-complete.component';

@Component({
  selector: 'ksp-retired-confirm',
  templateUrl: './retired-confirm.component.html',
  styleUrls: ['./retired-confirm.component.scss'],
})
export class RetiredConfirmComponent {
  constructor(private dialog: MatDialog) {}

  cancel() {
    this.dialog.closeAll();
  }

  confirm() {
    this.dialog.closeAll();
    this.dialog.open(RetiredCompleteComponent, {
      height: '275px',
      width: '350px',
    });


  }
}
