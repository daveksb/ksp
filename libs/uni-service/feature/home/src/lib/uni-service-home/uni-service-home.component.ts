import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FormVerifyOtpComponent } from '@ksp/self-service/ui/forms';

@Component({
  selector: 'ksp-uni-service-home',
  templateUrl: './uni-service-home.component.html',
  styleUrls: ['./uni-service-home.component.css'],
})
export class UniServiceHomeComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(FormVerifyOtpComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
