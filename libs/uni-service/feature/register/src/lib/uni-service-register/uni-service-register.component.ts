import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-uni-service-register',
  templateUrl: './uni-service-register.component.html',
  styleUrls: ['./uni-service-register.component.css'],
})
export class UniServiceRegisterComponent {
  constructor(private router: Router) {}

  search() {
    this.router.navigate(['/', 'search-uni']);
  }
}
