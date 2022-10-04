import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-osoi-detail',
  templateUrl: './osoi-detail.component.html',
  styleUrls: ['./osoi-detail.component.scss'],
})
export class OsoiDetailComponent {
  constructor(private router: Router) {}

  next() {
    this.router.navigate(['/one-school-one-innovation', 'confirm']);
  }

  cancel() {
    this.router.navigate(['/one-school-one-innovation', 'list']);
  }
}
