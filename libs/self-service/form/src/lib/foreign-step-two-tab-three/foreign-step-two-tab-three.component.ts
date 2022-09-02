import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForeignStepTwoTabThreeFormComponent } from '../foreign-step-two-tab-three-form/foreign-step-two-tab-three-form.component';

@Component({
  selector: 'self-service-foreign-step-two-tab-three',
  standalone: true,
  imports: [CommonModule, ForeignStepTwoTabThreeFormComponent],
  templateUrl: './foreign-step-two-tab-three.component.html',
  styleUrls: ['./foreign-step-two-tab-three.component.scss'],
})
export class ForeignStepTwoTabThreeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
