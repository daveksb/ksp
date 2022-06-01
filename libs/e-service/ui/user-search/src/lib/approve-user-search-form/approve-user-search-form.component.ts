import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export const data = [];

@Component({
  selector: 'e-service-approve-user-search-form',
  templateUrl: './approve-user-search-form.component.html',
  styleUrls: ['./approve-user-search-form.component.scss'],
})
export class ApproveUserSearchFormComponent implements OnInit {
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
