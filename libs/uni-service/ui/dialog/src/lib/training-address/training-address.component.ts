import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UniversitySearchComponent } from '@ksp/shared/form/university-search';

@Component({
  selector: 'uni-service-training-address',
  templateUrl: './training-address.component.html',
  styleUrls: ['./training-address.component.scss'],
})
export class TrainingAddressComponent {
  constructor(public dialog: MatDialog, private router: Router) {}

  searchAddress() {
    const dialogRef = this.dialog.open(UniversitySearchComponent, {
      height: '900px',
      width: '1200px',
    });

    // on submit
    /* dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.dialog.open(TrainingAddressComponent);
      }
    }); */
  }
}
