import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UniversitySearchComponent } from '@ksp/shared/form/university-search';

@Component({
  selector: 'uni-service-register-requester',
  templateUrl: './uni-service-register-requester.component.html',
  styleUrls: ['./uni-service-register-requester.component.scss'],
  /* encapsulation: ViewEncapsulation.None, */
})
export class UniServiceRegisterRequesterComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  search() {
    this.dialog.open(UniversitySearchComponent, {
      height: '900px',
      width: '1200px',
    });
  }

  next() {
    this.router.navigate(['/register', 'coordinator']);
  }
}
