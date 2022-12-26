import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'ksp-osoi-confirm',
  templateUrl: './osoi-confirm.component.html',
  styleUrls: ['./osoi-confirm.component.scss'],
})
export class OsoiConfirmComponent {
  constructor(private router: Router, private location: Location) {}

  back() {
    this.location.back();
  }

  cancel() {
    this.router.navigate(['/one-school-one-innovation', 'list']);
  }

  next() {
    this.router.navigate(['/one-school-one-innovation', 'list']);
  }
}
