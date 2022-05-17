import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReqDegreeCertConfirmComponent } from '@ksp/uni-service/ui/dialog';

@Component({
  selector: 'ksp-req-degree-cert-step-four',
  templateUrl: './req-degree-cert-step-four.component.html',
  styleUrls: ['./req-degree-cert-step-four.component.css'],
})
export class ReqDegreeCertStepFourComponent {
  constructor(public dialog: MatDialog, private router: Router) {}

  goToStep3() {
    this.router.navigate(['/', 'request-degree-cert', 'step-3']);
  }

  cancel() {
    this.router.navigate(['/', 'request-degree-cert']);
  }

  openDialog() {
    this.dialog.open(ReqDegreeCertConfirmComponent, {
      height: '200px',
      width: '350px',
    });
  }
}
