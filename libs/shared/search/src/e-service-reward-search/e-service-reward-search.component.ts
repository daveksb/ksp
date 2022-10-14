import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'ksp-e-service-reward-search',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule],
  templateUrl: './e-service-reward-search.component.html',
  styleUrls: ['./e-service-reward-search.component.scss'],
})
export class EServiceRewardSearchComponent implements OnInit {
  @Output() clear = new EventEmitter<boolean>();
  @Output() search = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}
}
