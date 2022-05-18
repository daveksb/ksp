import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-retired-complete',
  templateUrl: './retired-complete.component.html',
  styleUrls: ['./retired-complete.component.scss'],
})
export class RetiredCompleteComponent {
  constructor(private router: Router, private dialog: MatDialog) {}

  confirm() {
    this.dialog.closeAll();
    this.router.navigate(['/', 'login']);
  }
}
