import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KspRequest } from '@ksp/shared/interface';
import localForage from 'localforage';

@Component({
  selector: 'ksp-e-qualification-consider-meeting',
  templateUrl: './e-qualification-consider-meeting.component.html',
  styleUrls: ['./e-qualification-consider-meeting.component.scss'],
})
export class EQualificationConsiderMeetingComponent implements OnInit {
  verifyChoices = verifyChoices;
  kspRequests: KspRequest[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    localForage.getItem('qualification-meeting-result').then((res: any) => {
      //console.log('xxx = ', res);
      this.kspRequests = res;
    });
  }

  cancel() {
    this.router.navigate(['/qualification-approve', 'consider-list']);
  }

  save() {
    //
  }
}

const verifyChoices = [
  {
    name: 'รับรอง',
    value: 2,
  },
  {
    name: 'ไม่รับรอง',
    value: 3,
  },
  {
    name: 'ไม่พิจารณา',
    value: 4,
  },
];
