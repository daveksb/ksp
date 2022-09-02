import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'self-service-foreign-step-two-tab-one',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './foreign-step-two-tab-one.component.html',
  styleUrls: ['./foreign-step-two-tab-one.component.scss'],
})
export class ForeignStepTwoTabOneComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
