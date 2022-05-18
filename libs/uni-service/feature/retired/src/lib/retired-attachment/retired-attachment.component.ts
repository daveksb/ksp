import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RetiredConfirmComponent } from '../retired-confirm/retired-confirm.component';

@Component({
  selector: 'ksp-retired-attachment',
  templateUrl: './retired-attachment.component.html',
  styleUrls: ['./retired-attachment.component.scss'],
})
export class RetiredAttachmentComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  prevPage() {
    this.router.navigate(['/', 'retired', 'reason']);
  }

  cancel() {
    this.router.navigate(['/', 'retired', 'search']);
  }

  save() {
    const dialogRef = this.dialog.open(RetiredConfirmComponent, {
      height: '200px',
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
