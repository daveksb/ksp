import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UniversitySearchComponent } from '@ksp/shared/form/university-search';

@Component({
  selector: 'ksp-university-select',
  templateUrl: './university-select.component.html',
  styleUrls: ['./university-select.component.scss'],
})
export class UniversitySelectComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  search() {
    const dialogRef = this.dialog.open(UniversitySearchComponent, {
      height: '900px',
      width: '1200px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
