import { Component } from '@angular/core';
import { KspRequest, SelfGetRequest, SelfRequest } from '@ksp/shared/interface';
import { MatTabChangeEvent } from '@angular/material/tabs';
import localForage from 'localforage';

class KspApprovePersistData {
  checkDetail: any = null;
  requestData: KspRequest = new KspRequest();
}

@Component({
  template: ``,
  standalone: true,
})
export abstract class ERewardFormBaseComponent {
  VERIFY_CHOICES = [
    {
      name: 'ครบถ้วน และถูกต้อง',
      value: 'complete',
    },
    {
      name: 'ไม่ครบถ้วน และไม่ถูกต้อง',
      value: 'incomplete',
    },
  ];

  verifyChoice: any[] = [];
  selectedTab: MatTabChangeEvent = new MatTabChangeEvent();
  requestData = new KspRequest();
  requestId!: number;

  constructor() // protected generalInfoService: GeneralInfoService,
  // protected addressService: AddressService,
  // protected educationDetailService: EducationDetailService,
  // protected fb: FormBuilder,
  // protected requestService: SelfRequestService,
  // protected router: Router,
  // protected myInfoService: MyInfoService,
  // protected route: ActivatedRoute,
  // public dialog: MatDialog
  {}

  tabChanged(e: MatTabChangeEvent) {
    console.log('tab event = ', e);
    this.selectedTab = e;
  }

  // next() {
  //   console.log('next');
  //   this.persistData();
  //   this.router.navigate(['/teacher-council', 'confirm', this.requestId]);
  // }

  // save data to indexed db
  persistData() {
    //console.log('check sub result = ', checkSubResult);
    const saveData: KspApprovePersistData = {
      checkDetail: 'test', //this.form.controls.checkResult.value,
      requestData: this.requestData,
    };
    localForage.setItem('checkRequestData', saveData);
  }
}
