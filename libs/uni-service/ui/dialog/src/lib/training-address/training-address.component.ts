import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UniversitySearchComponent } from '@ksp/shared/form/university-search';

@Component({
  selector: 'uni-service-training-address',
  templateUrl: './training-address.component.html',
  styleUrls: ['./training-address.component.scss'],
})
export class TrainingAddressComponent {
  teachingAddressForm = this.fb.group({
    addressCode: [],
    addressName: [],
  });

  form = this.fb.group({
    addresses: this.fb.array([this.teachingAddressForm]),
  });

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder
  ) {}

  searchAddress() {
    this.dialog.open(UniversitySearchComponent, {
      height: '900px',
      width: '1200px',
    });

    // on submit
    /* dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.dialog.open(TrainingAddressComponent);
      }
    }); */
  }

  addAddress() {
    const teachingAddressForm = this.fb.group({
      addressCode: [],
      addressName: [],
    });
    this.addresses.push(teachingAddressForm);
  }

  get addresses() {
    return this.form.controls.addresses;
  }

  deleteAddress(index: number) {
    this.addresses.removeAt(index);
  }
}
