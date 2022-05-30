import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccusationSearchComponent } from '@ksp/e-service/dialog/accusation-search';

@Component({
  selector: 'e-service-ethic-accusation-record',
  templateUrl: './accusation-record.component.html',
  styleUrls: ['./accusation-record.component.scss'],
})
export class AccusationRecordComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  next() {
    this.router.navigate(['/', 'ethics', 'accusation', 'decision']);
  }

  cancel() {
    this.router.navigate(['/', 'ethics', 'accusation']);
  }

  openSearchDialog() {
    const dialog = this.dialog.open(AccusationSearchComponent, {
      height: '750px',
      width: '1250px',
    });

    /* dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onCompleted();
      }
    }); */
  }
}
