import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ksp-degree-search-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './degree-search-form.component.html',
  styleUrls: ['./degree-search-form.component.scss'],
})
export class DegreeSearchFormComponent implements OnInit {
  @Output() clear = new EventEmitter<boolean>();
  @Output() search = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}
}
