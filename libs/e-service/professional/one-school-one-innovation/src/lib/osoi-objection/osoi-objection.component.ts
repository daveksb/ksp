import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-osoi-objection',
  templateUrl: './osoi-objection.component.html',
  styleUrls: ['./osoi-objection.component.scss'],
})
export class OsoiObjectionComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  cancel() {
    this.router.navigate(['/', 'one-school-one-innovation', 'list']);
  }

  next() {
    this.router.navigate(['/', 'one-school-one-innovation', 'list']);
  }
}
