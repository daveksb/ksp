import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterCompletedComponent } from '@ksp/self-service/ui/content';

@Component({
  selector: 'self-service-register-step-three',
  templateUrl: './register-step-three.component.html',
  styleUrls: ['./register-step-three.component.scss'],
})
export class RegisterStepThreeComponent {
  constructor(public dialog: MatDialog, private router: Router) {}

  openDialog() {
    const dialogRef = this.dialog.open(RegisterCompletedComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  loginPage() {
    this.router.navigate(['/', 'login']);
  }
}
