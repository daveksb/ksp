import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EthicsService } from '@ksp/shared/service';

@Component({
  selector: 'e-service-accusation-main',
  templateUrl: './accusation-main.component.html',
  styleUrls: ['./accusation-main.component.scss'],
})
export class AccusationMainComponent {
  form = this.fb.group({
    accusation: [],
  });

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private service: EthicsService
  ) {}

  saveEthics() {
    const payload = {
      /*       ethicsno:
      accuserinfo:
      licenseinfo:
      addressinfo:
      workplaceinfo:
      idcardno:
      passportno:
      prefixth:  */
      firstnameth: '5',
      lastnameth: '6',
      prefixen: '7',
      firstnameen: '8',
      lastnameen: '9',
      birthdate: '2022-09-16T00:00:00',
      sex: '10',
      email: '11',
      phone: '12',
      accusationblackno: '13',
      accusationtype: '14',
      accusationincidentdate: '2022-09-16T00:00:00',
      accusationincidentplace: '15',
      accusationcondemnationtype: '16',
      accusationcondemnation: '17',
      accusationissuedate: '2022-09-16T00:00:00',
      accusationdetail: '18',
      accusationpunishmentdetail: '19',
      accusationviolatedetail: '20',
      accusationassignofficer: '21',
      accusationassigndate: '2022-09-16T00:00:00',
      accusationfile: "{'field1':'data1','field2':'data2','field3':'data3'}",
      accusationconsideration:
        "{'field1':'data1','field2':'data2','field3':'data3'}",
      investigationorderno: '22',
      investigationorderdate: '2022-09-16T00:00:00',
      investigationsubcommittee:
        "{'field1':'data1','field2':'data2','field3':'data3'}",
      investigationdate: '2022-09-16T00:00:00',
      investigationreportdate: '2022-09-16T00:00:00',
      investigationreport: '23',
      investigationfile: "{'field1':'data1','field2':'data2','field3':'data3'}",
      investigationresult:
        "{'field1':'data1','field2':'data2','field3':'data3'}",
      inquiryorderno: '24',
      inquiryorderdate: '2022-09-16T00:00:00',
      inquirysubcommittee:
        "{'field1':'data1','field2':'data2','field3':'data3'}",
      inquiryexplaindate: '2022-09-16T00:00:00',
      inquiryjbdate: '2022-09-16T00:00:00',
      inquiryreport: '25',
      inquiryfile: "{'field1':'data1','field2':'data2','field3':'data3'}",
      inquiryresult: "{'field1':'data1','field2':'data2','field3':'data3'}",
      resultredno: '26',
      resultcomitteeno: '27',
      resultcomitteedate: '2022-09-16T00:00:00',
      resultcomitteefile:
        "{'field1':'data1','field2':'data2','field3':'data3'}",
      resulttoaccuserdate: '2022-09-16T00:00:00',
      resulttoaccuserfile:
        "{'field1':'data1','field2':'data2','field3':'data3'}",
      resulttoschooldate: '2022-09-16T00:00:00',
      resulttoschoolfile:
        "{'field1':'data1','field2':'data2','field3':'data3'}",
      resulttoaccuseddate: '2022-09-16T00:00:00',
      resulttoaccusedfile:
        "{'field1':'data1','field2':'data2','field3':'data3'}",
      publishstatus: '28',
      publishdate: '2022-09-16T00:00:00',
    };
    this.service.createEthics(payload).subscribe((res) => {
      console.log('save = ', res);
    });
  }

  next() {
    this.router.navigate(['/accusation', 'decision']);
  }

  cancel() {
    this.router.navigate(['/accusation']);
  }
}
