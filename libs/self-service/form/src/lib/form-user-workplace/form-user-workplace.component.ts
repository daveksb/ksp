import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UniversitySearchComponent } from '@ksp/shared/form/university-search';

@Component({
  selector: 'self-service-form-user-workplace',
  templateUrl: './form-user-workplace.component.html',
  styleUrls: ['./form-user-workplace.component.css'],
})
export class FormUserWorkplaceComponent implements OnInit {
  form = this.fb.group({
    affiliation: [],
    addressName: [],
    houseNumber: [],
    villageNumber: [],
    lane: [],
    road: [],
    zipCode: [],
    provience: [],
    subDistrict: [],
    district: [],
  });

  constructor(private dialog: MatDialog, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((res) => {
      console.log('form value = ', res);
    });
  }

  openSearchDialog() {
    this.dialog.open(UniversitySearchComponent, {
      height: '900px',
      width: '1200px',
    });
  }
}
