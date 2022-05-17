import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  templateUrl: './req-foreign-id-complete.component.html',
  styleUrls: ['./req-foreign-id-complete.component.scss'],
})
export class ReqForeignIdCompleteComponent {
  constructor(public dialog: MatDialog, private router: Router) {}

  closeDialog() {
    this.dialog.closeAll();

    this.router.navigate(['/', 'request', 'home']);
  }
}
