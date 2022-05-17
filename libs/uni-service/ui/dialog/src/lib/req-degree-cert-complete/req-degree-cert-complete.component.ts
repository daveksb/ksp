import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  templateUrl: './req-degree-cert-complete.component.html',
  styleUrls: ['./req-degree-cert-complete.component.scss'],
})
export class ReqDegreeCertCompleteComponent {
  constructor(public dialog: MatDialog, private router: Router) {}

  homePage() {
    this.dialog.closeAll();

    this.router.navigate(['/', 'request', 'home']);
  }
}
