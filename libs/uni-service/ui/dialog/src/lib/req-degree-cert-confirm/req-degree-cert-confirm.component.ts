import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReqDegreeCertCompleteComponent } from '../req-degree-cert-complete/req-degree-cert-complete.component';

@Component({
  templateUrl: './req-degree-cert-confirm.component.html',
  styleUrls: ['./req-degree-cert-confirm.component.scss'],
})
export class ReqDegreeCertConfirmComponent {
  constructor(public dialog: MatDialog) {}

  closeDialog() {
    this.dialog.closeAll();
  }

  openDialog() {
    this.dialog.closeAll();

    this.dialog.open(ReqDegreeCertCompleteComponent, {
      height: '200px',
      width: '300px',
    });
  }
}
