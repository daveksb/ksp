import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { UniversitySearchComponent } from '@ksp/shared/search';
import { GeneralInfoService } from '@ksp/shared/service';

@Component({
  selector: 'uni-service-training-address',
  templateUrl: './training-address.component.html',
  styleUrls: ['./training-address.component.scss'],
})
export class TrainingAddressComponent {
  teachingAddressForm = this.fb.group({
    schoolid: [],
    schoolname: [],
    bureauid: [],
    bureauname: [],
    classlevel: [],
    term: [],
    year: []
  });

  form = this.fb.group({
    addresses: this.fb.array([]),
  });

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TrainingAddressComponent>,
    private generalInfoService: GeneralInfoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data.teachingpracticeschool.length) {
      this.setData(this.data.teachingpracticeschool);
    } else {
      this.addresses.push(this.teachingAddressForm);
    }
    if (this.data.disableAll) {
      this.addresses.controls
      .forEach(control => {
        control.disable();
      })
    }
  }

  setData(data: any) {
    data.forEach((address: any) => {
      const teachingAddressForm = this.fb.group({
        schoolid: address.schoolid,
        schoolname: address.schoolname,
        bureauid: address.bureauid,
        bureauname: address.bureauname,
        classlevel: address.classlevel,
        term: address.term,
        year: address.year
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
        searchType: 'school'
      },
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      if (response) {
        this.form.controls.addresses.at(index).patchValue({
          schoolid: response.schoolid,
          schoolname: response.schoolname,
          bureauid: response.bureauid,
          bureauname: response.bureauname
        });
      }
    });
  }

  addAddress() {
    const teachingAddressForm = this.fb.group({
      schoolid: [],
      schoolname: [],
      bureauid: [],
      bureauname: [],
      classlevel: [],
      term: [],
      year: []
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
