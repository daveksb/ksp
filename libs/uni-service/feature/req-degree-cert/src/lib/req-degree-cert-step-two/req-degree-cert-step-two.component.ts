import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-req-degree-cert-step-two',
  templateUrl: './req-degree-cert-step-two.component.html',
  styleUrls: ['./req-degree-cert-step-two.component.css'],
})
export class ReqDegreeCertStepTwoComponent{
  constructor(private router: Router) {}

  goToStep1() {
    this.router.navigate(['/', 'request', 'degree-cert-1']);
  }

  goToStep3() {
    this.router.navigate(['/', 'request', 'degree-cert-3']);
  }
}
