import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UniversitySearchComponent } from '@ksp/shared/search';

@Component({
  templateUrl: './uni-register-requester.component.html',
  styleUrls: ['./uni-register-requester.component.scss'],
})
export class UniRegisterRequesterComponent {
  form = this.fb.group({
    requester: [],
  });

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {}

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
