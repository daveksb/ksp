import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UniversitySearchComponent } from '@ksp/shared/ui/university-search';

@Component({
  selector: 'uni-service-register-requester',
  templateUrl: './uni-service-register-requester.component.html',
  styleUrls: ['./uni-service-register-requester.component.scss'],
})
export class UniServiceRegisterRequesterComponent {
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

  nextPage() {
    this.router.navigate(['/', 'register', 'coordinator']);
  }
}
