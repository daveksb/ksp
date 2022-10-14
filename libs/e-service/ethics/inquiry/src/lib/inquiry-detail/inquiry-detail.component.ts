import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { EServiceUiAccusationInfoModule } from '@ksp/e-service/ui/accusation-info';
import { FileUploadComponent } from '@ksp/shared/form/file-upload';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import {
  defaultSubcommittee,
  EhicsSubcommittee,
  KspFormBaseComponent,
} from '@ksp/shared/interface';
import { BottomNavComponent } from '@ksp/shared/menu';
import {
  LicenseInfoComponent,
  LicenseTypeButtonGroupComponent,
  RequestHeaderInfoComponent,
} from '@ksp/shared/ui';
import { providerFactory, thaiDate } from '@ksp/shared/utility';

@Component({
  selector: 'e-service-inquiry-detail',
  templateUrl: './inquiry-detail.component.html',
  styleUrls: ['./inquiry-detail.component.scss'],
  standalone: true,
  imports: [
    MatTabsModule,
    CommonModule,
    MatIconModule,
    BottomNavComponent,
    SharedFormOthersModule,
    EServiceUiAccusationInfoModule,
    RequestHeaderInfoComponent,
    LicenseTypeButtonGroupComponent,
    LicenseInfoComponent,
    FileUploadComponent,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  providers: providerFactory(InquiryDetailComponent),
})
export class InquiryDetailComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    inquiryorderno: [],
    inquiryorderdate: [],
    inquirysubcommittee: this.fb.array([] as FormGroup[]),
    inquiryexplaindate: [],
    inquiryjbdate: [],
    inquiryreport: [],
    inquiryfile: [],
    inquiryresult: this.fb.group({
      considertimes: [],
      considerdate: [],
      considerreason: [],
      considerday: [],
      considerdatefrom: [],
      considerdateto: [],
      consider: [],
      otherreason: [],
    }),
  });
  today = thaiDate(new Date());
  requestNumber = '';
  constructor(private router: Router, private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
  get members() {
    return this.form.controls.inquirysubcommittee as FormArray;
  }

  next() {
    this.router.navigate(['/', 'ethics', 'inquiry', 'result']);
  }

  cancel() {
    this.router.navigate(['/', 'ethics', 'inquiry']);
  }
  addRow(data: EhicsSubcommittee = defaultSubcommittee) {
    const rewardForm = this.fb.group({
      idcardno: data.idcardno,
      idnumber: data.idnumber,
      positioncommittee: data.positioncommittee,
      firstname: data.firstname,
      lastname: data.lastname,
      position: data.position,
      bureau: data.bureau,
    });
    this.members.push(rewardForm);
  }
  deleteRow(index: number) {
    this.members.removeAt(index);
  }
}
