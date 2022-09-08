import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForgotPasswordSearchPersonComponent } from '@ksp/shared/dialog';

@Component({
  templateUrl: './self-service-thai-login.component.html',
  styleUrls: ['./self-service-thai-login.component.css'],
})
export class SelfServiceThaiLoginComponent {
  eyeIconClicked = false;

  form = this.fb.group({
    personId: [],
    password: [],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  register() {
    this.router.navigate(['/', 'landing']);
  }

  login() {
    this.router.navigate(['/', 'home']);
  }

  forgot() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(ForgotPasswordSearchPersonComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      //console.log(`Dialog result: ${result}`);
    });
  }
}
