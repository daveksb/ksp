import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'e-service-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log();
  }

  elicense() {
    this.router.navigate(['request-license', 'approve-list']);
  }

  standard() {
    this.router.navigate(['degree-cert', 'list', '1', '0']);
  }

  ethics() {
    this.router.navigate(['accusation']);
  }

  professional() {
    this.router.navigate(['teacher-council']);
  }

  fee() {
    this.router.navigate(['payment-fee']);
  }

  admin() {
    this.router.navigate(['/']);
  }
}
