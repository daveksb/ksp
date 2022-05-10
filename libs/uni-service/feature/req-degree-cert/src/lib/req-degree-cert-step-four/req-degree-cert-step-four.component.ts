import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-req-degree-cert-step-four',
  templateUrl: './req-degree-cert-step-four.component.html',
  styleUrls: ['./req-degree-cert-step-four.component.css'],
})
export class ReqDegreeCertStepFourComponent {
  constructor(private router: Router) {}

  goToStep3() {
    this.router.navigate(['/', 'request', 'degree-cert-3']);
  }
}
