import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormVerifyPhoneComponent } from '@ksp/self-service/form';

@Component({
  selector: 'self-service-register-step-two',
  templateUrl: './register-step-two.component.html',
  styleUrls: ['./register-step-two.component.scss'],
})
export class RegisterStepTwoComponent {
  form = this.fb.group({
    personId: [],
    backPersonId: [],
  });

  constructor(public dialog: MatDialog, private router: Router, private fb: FormBuilder) {}

  openDialog() {
    const dialogRef = this.dialog.open(FormVerifyPhoneComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  loginPage() {
    this.router.navigate(['/', 'login']);
  }

  previousPage() {
    this.router.navigate(['/', 'register', 'step-1']);
  }
}
