import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
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
    addresses: this.fb.array([]),
  });

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TrainingAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.data);
    if (this.data.teachingpracticeschool.length) {
      console.log('here1');
      this.setData(this.data.teachingpracticeschool);
    } else {
      console.log('here');
      this.addresses.push(this.teachingAddressForm);
    }
  }

  setData(data: any) {
    data.forEach((address: any) => {
      const teachingAddressForm = this.fb.group({
        universitycode: address.universitycode,
        uniname: address.uniname,
        uniid: address.uniid,
      });
      this.addresses.push(teachingAddressForm);
    });
  }

  searchAddress(index: any) {
    const dialogRef = this.dialog.open(UniversitySearchComponent, {
      height: '100vh',
      width: '75vw',
      position: {
        top: '0px',
        right: '0px',
      },
      data: {
        subHeader: 'กรุณาเลือกหน่วยงาน / สถานศึกษา',
        searchType: 'uni',
      },
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      if (response) {
        this.form.controls.addresses.at(index).patchValue({
          universitycode: response.universitycode,
          uniname: response.name,
          uniid: response.id,
        });
      }
    });
  }

  addAddress() {
    const teachingAddressForm = this.fb.group({
      universitycode: [],
      uniname: [],
      uniid: [],
    });
    this.addresses.push(teachingAddressForm);
  }

  get addresses() {
    return this.form.controls.addresses as FormArray;
  }

  deleteAddress(index: number) {
    this.addresses.removeAt(index);
  }

  save() {
    this.dialogRef.close(this.form.controls.addresses.value);
  }
}
