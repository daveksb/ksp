import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ksp-stepper-nav',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './stepper-nav.component.html',
  styleUrls: ['./stepper-nav.component.scss'],
})
export class StepperNavComponent implements OnInit {
  @Input() buttonColor = 'light-grey';
  @Input() buttonLabel = '';
  @Input() gridGapSize = '';
  constructor() {}

  ngOnInit(): void {}
}
