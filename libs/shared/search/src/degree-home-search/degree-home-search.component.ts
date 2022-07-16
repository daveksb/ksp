import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ksp-degree-home-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './degree-home-search.component.html',
  styleUrls: ['./degree-home-search.component.scss'],
})
export class DegreeHomeSearchComponent implements OnInit {
  @Output() clear = new EventEmitter<boolean>();
  @Output() search = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}
}
