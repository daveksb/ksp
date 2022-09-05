import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForeignStepTwoTabOneComponent } from '../foreign-step-two-tab-one/foreign-step-two-tab-one.component';

@Component({
  selector: 'self-service-foreign-step-two-tab-two',
  standalone: true,
  imports: [CommonModule, ForeignStepTwoTabOneComponent],
  templateUrl: './foreign-step-two-tab-two.component.html',
  styleUrls: ['./foreign-step-two-tab-two.component.scss'],
})
export class ForeignStepTwoTabTwoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
