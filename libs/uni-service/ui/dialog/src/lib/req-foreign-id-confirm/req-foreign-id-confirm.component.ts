import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReqForeignIdCompleteComponent } from '../req-foreign-id-complete/req-foreign-id-complete.component';

@Component({
  templateUrl: './req-foreign-id-confirm.component.html',
  styleUrls: ['./req-foreign-id-confirm.component.scss'],
})
export class ReqForeignIdConfirmComponent {
  constructor(public dialog: MatDialog, private router: Router) {}

  cancel() {
    this.dialog.closeAll();
  }

  openDialog() {
    this.dialog.closeAll();

    this.dialog.open(ReqForeignIdCompleteComponent, {
      height: '400px',
      width: '600px',
    });
  }
}
