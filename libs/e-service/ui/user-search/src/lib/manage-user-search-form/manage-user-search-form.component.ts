import { Component, EventEmitter, OnInit, Output } from '@angular/core';

export const data = [];

@Component({
  selector: 'e-service-manage-user-search-form',
  templateUrl: './manage-user-search-form.component.html',
  styleUrls: ['./manage-user-search-form.component.scss'],
})
export class ManageUserSearchFormComponent implements OnInit {
  //@Input() searchType: SearchType = 'school';
  @Output() confirmed = new EventEmitter<string>();

  selectedUniversity = '';

  data = [];

  ngOnInit(): void {
    this.data = [];
  }

  onItemChange(universityCode: string) {
    this.selectedUniversity = universityCode;
    console.log('universityCode = ', universityCode);
  }

  search() {
    this.data = data;
  }
}
