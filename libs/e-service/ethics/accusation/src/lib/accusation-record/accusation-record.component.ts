import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'e-service-ethic-accusation-record',
  templateUrl: './accusation-record.component.html',
  styleUrls: ['./accusation-record.component.scss'],
})
export class AccusationRecordComponent {
  constructor(public router: Router) {}

  next() {
    this.router.navigate(['/', 'ethics', 'accusation', 'decision']);
  }
}
