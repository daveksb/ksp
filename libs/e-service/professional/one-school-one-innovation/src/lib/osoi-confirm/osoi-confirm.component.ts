import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-osoi-confirm',
  templateUrl: './osoi-confirm.component.html',
  styleUrls: ['./osoi-confirm.component.scss'],
})
export class OsoiConfirmComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  back() {
    this.router.navigate(['/', 'one-school-one-innovation', 'approve']);
  }

  cancel() {
    this.router.navigate(['/', 'one-school-one-innovation', 'list']);
  }

  next() {
    this.router.navigate(['/', 'one-school-one-innovation', 'list']);
  }
}
