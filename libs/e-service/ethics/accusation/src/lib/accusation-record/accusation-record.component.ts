import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { AccusationSearchComponent } from '@ksp/e-service/dialog/accusation-search';
import { EServiceUiAccusationInfoModule } from '@ksp/e-service/ui/accusation-info';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { BottomNavComponent } from '@ksp/shared/menu';
import {
  LicenseInfoComponent,
  LicenseTypeButtonGroupComponent,
  RequestHeaderInfoComponent,
  StepperNavComponent,
} from '@ksp/shared/ui';
import { TopNavComponent } from '@ksp/shared/menu';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

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
    StepperNavComponent
  ],
  providers: providerFactory(AccusationRecordComponent),
})
export class AccusationRecordComponent
  extends KspFormBaseComponent
  implements OnInit
{
  accusationFiles = ['เอกสารกล่าวหา/กล่าวโทษ', 'สำเนาบัตรประชาชน'];

  override form = this.fb.group({
    blackNumber: [],
    misconductEthic: [],
    incidentDate: [],
    incidentAddress: [],
    incidentType: [],
    accuseSubject: [],
    orderDate: [],
    detail: [],
    punishType: [],
    offend: [],
    assignStaff: [],
    assignDate: [],
  });

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private fb: FormBuilder
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

  license = [
    'ใบอนุญาตประกอบวิชาชีพ - ครู',
    'ใบอนุญาตประกอบวิชาชีพ - ผู้บริหารสถานศึกษา',
    'ใบอนุญาตประกอบวิชาชีพ - ผู้บริหารสถานศึกษา',
    'ใบอนุญาตประกอบวิชาชีพ - ศึกษานิเทศก์',
  ];

  @Input() hideAllButtons = false;
  @Input() hideContainer = false;
  @Input() hideTitle = false;
  @Input() hideBox = false;

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      //console.log('res2 = ', res);
    });
  }
  openSearchDialog() {
    this.dialog.open(AccusationSearchComponent, {
      height: '750px',
      width: '1250px',
    });
  }

  /* dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onCompleted();
      }
    }); */
}
