import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'e-service-ethic-accusation-list',
  templateUrl: './accusation-list.component.html',
  styleUrls: ['./accusation-list.component.scss'],
})
export class AccusationListComponent {
  constructor(public router: Router) {}

  next() {
    this.router.navigate(['/', 'ethics', 'accusation', 'detail']);
  }
}
