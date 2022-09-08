import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  templateUrl: './register-completed.component.html',
  styleUrls: ['./register-completed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterCompletedComponent {
  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      subTitle: string;
      btnLabel: string;
    }
  ) {}

  loginPage() {
    this.router.navigate(['/', 'login']);
  }
}
