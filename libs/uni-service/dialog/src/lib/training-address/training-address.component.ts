import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UniversitySearchComponent } from '@ksp/shared/search';

@Component({
  selector: 'uni-service-training-address',
  templateUrl: './training-address.component.html',
  styleUrls: ['./training-address.component.scss'],
})
export class TrainingAddressComponent {
  teachingAddressForm = this.fb.group({
    uniid: [],
    universitycode: [],
    uniname: [],
  });

  form = this.fb.group({
    addresses: this.fb.array([this.teachingAddressForm]),
  });

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TrainingAddressComponent>) {}

  searchAddress(index: any) {
    const dialogRef = this.dialog.open(UniversitySearchComponent, {
      height: '900px',
      width: '1200px',
      data: {
        subHeader: 'กรุณาเลือกหน่วยงาน / สถานศึกษา',
        searchType: 'uni',
      },
    });
    dialogRef.afterClosed().subscribe((response: any)=>{
      if (response) {
        this.form.controls.addresses.at(index).patchValue({
          universitycode: response.universitycode,
          uniname: response.name,
          uniid: response.id
        })
      }
    })
  }

  addAddress() {
    const teachingAddressForm = this.fb.group({
      universitycode: [],
      uniname: [],
      uniid: []
    });
    this.addresses.push(teachingAddressForm);
  }

  get addresses() {
    return this.form.controls.addresses;
  }

  deleteAddress(index: number) {
    this.addresses.removeAt(index);
  }

  save() {
    this.dialogRef.close(this.form.controls.addresses.value);
  }
}
