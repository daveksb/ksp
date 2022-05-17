import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReqForeignIdConfirmComponent } from '@ksp/uni-service/ui/dialog';

@Component({
  selector: 'ksp-req-foreign-id',
  templateUrl: './req-foreign-id.component.html',
  styleUrls: ['./req-foreign-id.component.css'],
})
export class ReqForeignIdComponent {
  constructor(public dialog: MatDialog, private router: Router) {}

  cancel() {
    this.router.navigate(['/', 'request', 'home']);
  }

  openDialog() {
    this.dialog.open(ReqForeignIdConfirmComponent, {
      height: '400px',
      width: '600px',
    });
  }
}
