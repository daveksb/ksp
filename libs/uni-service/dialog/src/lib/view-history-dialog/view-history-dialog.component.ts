import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { UniversitySearchComponent } from '@ksp/shared/search';
import { GeneralInfoService } from '@ksp/shared/service';
import { studentStatusList } from 'libs/shared/constant/src/uni-service-constant';
import { FormAddressTableComponent } from 'libs/shared/form/others/src/lib/form-address-table/form-address-table.component';
import { StudentListSubjectComponent } from '../student-list-subject/student-list-subject.component';
import { TrainingAddressComponent } from '../training-address/training-address.component';

@Component({
  selector: 'uni-service-view-history-dialog',
  templateUrl: './view-history-dialog.component.html',
  styleUrls: ['./view-history-dialog.component.scss'],
})
export class ViewHistoryAdmissionComponent {
  formStudent = this.fb.group({
    user: this.fb.array([]),
  });
  studentStatusList = studentStatusList;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ViewHistoryAdmissionComponent>,
    private generalInfoService: GeneralInfoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.data);
    this.initFormAdmission(this.data);
  }

  get user(): FormArray {
    return this.formStudent.get('user') as FormArray;
  }

  initFormAdmission(data: any) {
    let datasource = [];
    if (data.pageType == 'admissionList') {
      datasource = data.datasource.filter((data: any) => data.requesttype == '05');
    } else {
      datasource = data.datasource.filter((data: any) => data.requesttype == '06');
    }
    console.log(datasource)
    if (datasource.length) {
      datasource.forEach((request: any) => {
        if (request.admissionlist || request.graduatelist) {
          const parseuser = data.pageType == 'admissionList' ? 
                            JSON.parse(request.admissionlist) :
                            JSON.parse(request.graduatelist);
          console.log(parseuser)
          parseuser.forEach((user: any, index: any) => {
            user.index = index;
            user.subjects = JSON.parse(user.subjects);
            this.user.push(this.edituser(user));
          });
        }
      });
    }
  }

  searchAddress(index: any, disable: boolean) {
    const dialogRef = this.dialog.open(TrainingAddressComponent, {
      height: '100vh',
      width: '75vw',
      position: {
        top: '0px',
        right: '0px',
      },
      data: {
        teachingpracticeschool:
          JSON.parse(this.user.at(index).value.teachingpracticeschool),
        disableAll: disable ?? false,
      },
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      if (response) {
        this.user.at(index).patchValue({
          teachingpracticeschool: response,
        });
      }
    });
  }

  autoScroll() {
    setTimeout(() => {
      const doc = document.getElementById('address-info');
      if (doc != null) {
        doc.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
      }   
    }, 0);
  }

  viewAdress(address: any) {
    this.dialog.open(FormAddressTableComponent, {
      width: '75vw',
      height: '100vw',
      position: {
        top: '0px',
        right: '0px',
      },
      data: {
        mode: 'view',
        address: address.addressInfo || {},
        isDialog: true,
      },
    });
  }

  insertSubject(subjectInfo: any, index: any, disable: boolean) {
    const dialogRef = this.dialog.open(StudentListSubjectComponent, {
      width: '600px',
      data: {
        ...subjectInfo,
        disableAll: disable ?? false
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.user.at(index).patchValue({
          subjects: res,
        });
      }
    });
  }

  edituser(data: any) {
    const userAddress = JSON.parse(data.address);
    return this.fb.group({
      id: [data.id],
      checked: [data.checked ? data.checked : false],
      locked: [true],
      index: [data.index],
      no: [data.index + 1],
      admissiondate: [data.admissiondate],
      studentno: [data.studentno],
      studentstatus: [data.studentstatus],
      originaldegree: [data.originaldegree],
      idcardno: [data.idcardno],
      passportno: [data.passportno],
      nationality: [data.nationality],
      prefixth: [data.prefixth],
      firstnameth: [data.firstnameth],
      lastnameth: [data.lastnameth],
      prefixen: [data.prefixen],
      firstnameen: [data.firstnameen],
      middlenameen: [data.middlenameen],
      lastnameen: [data.lastnameen],
      phone: [data.phone],
      birthdate: [data.birthdate],
      address: userAddress ? this.fb.group({
        addressInfo: [
          {
            location: userAddress?.location || null,
            housenumber: userAddress?.housenumber || null,
            villagenumber: userAddress?.villagenumber || null,
            lane: userAddress?.lane || null,
            road: userAddress?.road || null,
            zipcode: userAddress?.zipcode || null,
            provinceid: userAddress?.provinceid || null,
            districtid: userAddress?.districtid || null,
            subdistrictid: userAddress?.subdistrictid || null,
            remark: userAddress?.remark || null,
          },
        ],
      }) : this.fb.group({ addressInfo: [] }),
      approveno: [data.approveno],
      graduationdate: [data.graduationdate],
      approvedate: [data.approvedate],
      subjects: data.subjects
        ? [
            {
              subject1: data.subjects.subject1,
              subject2: data.subjects.subject2,
            },
            Validators.required,
          ]
        : [
            { subject1: '', subject2: '' },
            this.data.pageType == 'admissionList' ? Validators.required : undefined,
          ],
      teachingpracticeschool: [data.teachingpracticeschool],
    });
  }

}
