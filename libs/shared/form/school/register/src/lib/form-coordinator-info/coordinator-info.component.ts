import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ksp-coordinator-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coordinator-info.component.html',
  styleUrls: ['./coordinator-info.component.scss'],
})
export class CoordinatorInfoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
