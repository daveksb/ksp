import { Component } from '@angular/core';
import { KspRequest } from '@ksp/shared/interface';
import { MatTabChangeEvent } from '@angular/material/tabs';
import localForage from 'localforage';
import { KspApprovePersistData } from '@ksp/shared/interface';
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

  constructor() {}

  tabChanged(e: MatTabChangeEvent) {
    this.selectedTab = e;
  }

  // save data to indexed db
  persistData(checkDetail: any) {
    const saveData: KspApprovePersistData = {
      checkDetail,
      requestData: this.requestData,
    };
    localForage.setItem('checkRequestData', saveData);
  }
}
