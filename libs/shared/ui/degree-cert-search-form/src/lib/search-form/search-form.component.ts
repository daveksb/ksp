import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ksp-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent {
  @Output() searched = new EventEmitter<boolean>();
  @Output() cleared = new EventEmitter<boolean>();
}
