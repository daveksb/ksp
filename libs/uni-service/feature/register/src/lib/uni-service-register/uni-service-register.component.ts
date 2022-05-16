import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UniversitySearchComponent } from '@ksp/shared/ui/university-search';

@Component({
  selector: 'ksp-uni-service-register',
  templateUrl: './uni-service-register.component.html',
  styleUrls: ['./uni-service-register.component.css'],
})
export class UniServiceRegisterComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  search() {
    //this.router.navigate(['/', 'search-uni']);
    const dialogRef = this.dialog.open(UniversitySearchComponent, {
      height: '900px',
      width: '1200px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
