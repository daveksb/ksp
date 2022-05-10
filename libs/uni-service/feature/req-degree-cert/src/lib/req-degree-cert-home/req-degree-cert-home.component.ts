import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-req-degree-cert-home',
  templateUrl: './req-degree-cert-home.component.html',
  styleUrls: ['./req-degree-cert-home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ReqDegreeCertHomeComponent {
  constructor(private router: Router) {}

  goToStep1() {
    this.router.navigate(['/', 'request', 'degree-cert-1']);
  }
}
