import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UniversitySearchComponent } from '@ksp/shared/form/university-search';

@Component({
  selector: 'uni-service-register-requester',
  templateUrl: './uni-service-register-requester.component.html',
  styleUrls: ['./uni-service-register-requester.component.scss'],
})
export class UniServiceRegisterRequesterComponent {
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
