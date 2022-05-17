import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UniversitySearchComponent } from '@ksp/shared/ui/university-search';
import {
  RegisterCompletedComponent,
  RegisterConfirmComponent,
} from '@ksp/uni-service/ui/dialog';

@Component({
  selector: 'ksp-uni-service-register-coordinator',
  templateUrl: './uni-service-register-coordinator.component.html',
  styleUrls: ['./uni-service-register-coordinator.component.scss'],
})
export class UniServiceRegisterCoordinatorComponent {
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

  prevPage() {
    this.router.navigate(['/', 'register-requester']);
  }

  cancel() {
    this.router.navigate(['/', 'login']);
  }

  submit() {
    // will do later
  }

  confirm() {
    this.dialog.open(RegisterConfirmComponent, {
      height: '200px',
      width: '350px',
    });
  }
}
