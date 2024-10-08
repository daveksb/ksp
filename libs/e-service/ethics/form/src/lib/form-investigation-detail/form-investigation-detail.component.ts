import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { EServiceUiAccusationInfoModule } from '@ksp/e-service/ui/accusation-info';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { BottomNavComponent } from '@ksp/shared/menu';
import {
  LicenseInfoComponent,
  LicenseTypeButtonGroupComponent,
  RequestHeaderInfoComponent,
} from '@ksp/shared/ui';
import { FileUploadComponent } from '@ksp/shared/form/file-upload';
import { providerFactory, thaiDate } from '@ksp/shared/utility';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  decisions,
  defaultSubcommittee,
  EhicsSubcommittee,
  KspFormBaseComponent,
} from '@ksp/shared/interface';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { GeneralInfoService } from '@ksp/shared/service';

@Component({
  selector: 'e-service-form-investigation-detail',
  templateUrl: './form-investigation-detail.component.html',
  styleUrls: ['./form-investigation-detail.component.scss'],
  standalone: true,
  imports: [
    MatTabsModule,
    CommonModule,
    BottomNavComponent,
    SharedFormOthersModule,
    EServiceUiAccusationInfoModule,
    RequestHeaderInfoComponent,
    MatIconModule,
    LicenseTypeButtonGroupComponent,
    LicenseInfoComponent,
    FileUploadComponent,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  providers: providerFactory(FormInvestigationDetailComponent),
})
export class FormInvestigationDetailComponent
  extends KspFormBaseComponent
  implements OnInit
{
  @Input() hideAllButtons = false;
  @Input() hideContainer = false;
  @Input() hideTitle = false;
  prefixList$!: Observable<any>;
  today = thaiDate(new Date());
  requestNumber = '';
  decisions = decisions;

  override form = this.fb.group({
    investigationorderno: [],
    investigationorderdate: [],
    investigationsubcommittee: this.fb.array([] as FormGroup[]),
    investigationdate: [],
    investigationreportdate: [],
    investigationreport: [],
    investigationfile: [],
    investigationresult: this.fb.group({
      decisions: [],
      causedetail: [],
    }),
  });

  ngOnInit(): void {
    this.getListData();
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService
  ) {
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
    return this.form.controls.investigationsubcommittee as FormArray;
  }
  addRow(data: EhicsSubcommittee = defaultSubcommittee) {
    const rewardForm = this.fb.group({
      idcardno: data.idcardno,
      idnumber: data.idnumber,
      positioncommittee: data.positioncommittee,
      prefix: data.prefix,
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
  getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
  }
}
