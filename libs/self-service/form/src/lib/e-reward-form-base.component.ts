import { Component } from '@angular/core';
import { KspRequest, SelfRequest } from '@ksp/shared/interface';
import { MatTabChangeEvent } from '@angular/material/tabs';
import localForage from 'localforage';
import { KspApprovePersistData } from '@ksp/shared/interface';
import { ActivatedRoute } from '@angular/router';
import { ERequestService } from '@ksp/shared/service';
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
  mode: 'confirm' | 'check' = 'confirm';

  constructor(
    protected route: ActivatedRoute,
    protected requestService: ERequestService
  ) {}

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

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        this.requestService
          .getKspRequestById(this.requestId)
          .subscribe((res) => {
            if (res) {
              this.requestData = res;
              this.patchData(res);
            }
          });
      }
    });
  }

  getMode() {
    this.route.url.subscribe((url) => {
      if (url[0].path === 'check') {
        this.mode = 'check';
      }
    });
  }

  abstract patchData(data: SelfRequest): void;
}
