import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UniversitySearchComponent } from '@ksp/shared/form/university-search';

@Component({
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss'],
})
export class CurrentUserComponent {
  foundUser = false;

  constructor(public router: Router, private dialog: MatDialog) {}

  openSearchDialog() {
    const dialog = this.dialog.open(UniversitySearchComponent, {
      height: '900px',
      width: '1200px',
    });

    // on submit
    dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) this.foundUser = true;
    });
  }

  next() {
    this.router.navigate(['/', 'register', 'requester-info']);
  }

  cancel() {
    this.router.navigate(['/', 'login']);
  }
}
