import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-req-degree-cert-step-three',
  templateUrl: './req-degree-cert-step-three.component.html',
  styleUrls: ['./req-degree-cert-step-three.component.css'],
})
export class ReqDegreeCertStepThreeComponent{
  constructor(private router: Router) {}

  goToStep2() {
    this.router.navigate(['/', 'request', 'degree-cert-2']);
  }

  goToStep4() {
    this.router.navigate(['/', 'request', 'degree-cert-4']);
  }
}
