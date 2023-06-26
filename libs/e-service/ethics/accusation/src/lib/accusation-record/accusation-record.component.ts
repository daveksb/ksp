import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { AccusationSearchComponent } from '@ksp/e-service/dialog/accusation-search';
import { EServiceUiAccusationInfoModule } from '@ksp/e-service/ui/accusation-info';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { BottomNavComponent, StepperNavComponent } from '@ksp/shared/menu';
import {
  LicenseInfoComponent,
  LicenseTypeButtonGroupComponent,
  RequestHeaderInfoComponent,
} from '@ksp/shared/ui';
import { TopNavComponent } from '@ksp/shared/menu';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ACCUSATION_FILES,
  defaultEhicsMember,
  EhicsMember,
  KspFormBaseComponent,
} from '@ksp/shared/interface';
import { providerFactory, thaiDate } from '@ksp/shared/utility';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
import { GeneralInfoService } from '@ksp/shared/service';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'e-service-ethic-accusation-record',
  templateUrl: './accusation-record.component.html',
  styleUrls: ['./accusation-record.component.scss'],
  standalone: true,
  imports: [
    MatTabsModule,
    CommonModule,
    BottomNavComponent,
    SharedFormOthersModule,
    EServiceUiAccusationInfoModule,
    RequestHeaderInfoComponent,
    MatIconModule,
    TopNavComponent,
    LicenseTypeButtonGroupComponent,
    LicenseInfoComponent,
    ReactiveFormsModule,
    StepperNavComponent,
    MatDatepickerModule,
  ],
  providers: providerFactory(AccusationRecordComponent),
})
export class AccusationRecordComponent
  extends KspFormBaseComponent
  implements OnInit
{
  today = thaiDate(new Date());
  requestNumber = '';
  accusationFiles: any[] = structuredClone(ACCUSATION_FILES);
  uniqueTimestamp: any;
  updateStatus = false;
  selectId: any
  prefixList$!: Observable<any>;

  override form = this.fb.group({
    accusationblackno: [null, Validators.required],
    accusationtype: [null, Validators.required],
    accusationincidentdate: [null, Validators.required],
    accusationincidentplace: [null, Validators.required],
    accusationcondemnationtype: [null, Validators.required],
    accusationcondemnation: [null, Validators.required],
    accusationissuedate: [],
    accusationdetail: [],
    accusationpunishmentdetail: [],
    accusationviolatedetail: [],
    accusationassignofficer: [],
    accusationassigndate: [],
    accuserinfo: this.fb.array([] as FormGroup[]),
    accusationconsideration: [],
    id : []
  });
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
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
    return this.form.controls.accuserinfo as FormArray;
  }
  addRow(data: EhicsMember = defaultEhicsMember) {
    const rewardForm = this.fb.group({
      idcardno: [data.idcardno],
      prefix: [data.prefix],
      firstname: [data.firstname],
      lastname: [data.lastname],
      phone: [data.phone],
    });
    this.members.push(rewardForm);
  }
  deleteRow(index: number) {
    this.members.removeAt(index);
  }
  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      console.log('res2 = ', res);
    });
    this.uniqueTimestamp = uuidv4();
    this.getListData();
  }

  getListData() {
    this.prefixList$ = this.generalInfoService.getPrefix();
  }

  openSearchDialog() {
    const dialogRef = this.dialog.open(AccusationSearchComponent, {
      height: '100vh',
      width: '75vw',
      position: {
        top: '0px',
        right: '0px',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.selectId = result
      this.updateStatus = true
    });
  }

  /* dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onCompleted();
      }
    }); */
}
