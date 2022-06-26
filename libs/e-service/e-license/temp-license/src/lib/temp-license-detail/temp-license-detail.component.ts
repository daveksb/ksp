import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { TempLicenseDetailService } from './temp-license-detail.service';

@Component({
  selector: 'e-service-temp-license-detail',
  templateUrl: './temp-license-detail.component.html',
  styleUrls: ['./temp-license-detail.component.scss'],
})
export class TempLicenseDetailComponent implements OnInit {
  reason: string[][] = [];
  choices: string[] = [];
  selectedTabIndex = 0;
  educationInfo: string[] = [];
  teachingInfo: string[] = [];
  reasonInfo: string[] = [];
  evidenceFiles: string[] = [];

  constructor(
    private router: Router,
    private service: TempLicenseDetailService
  ) {}

  ngOnInit(): void {
    this.reason = this.service.reason;
    this.choices = this.service.choices;
    this.educationInfo = this.service.educationInfo;
    this.teachingInfo = this.service.teachingInfo;
    this.reasonInfo = this.service.reasonInfo;
    this.evidenceFiles = this.service.evidenceFiles;
  }

  cancel() {
    this.router.navigate(['/temp-license']);
  }

  next() {
    this.router.navigate(['/temp-license', 'forbidden']);
  }

  prevPage() {
    this.router.navigate(['/temp-license', 'list']);
  }

  tabChanged(e: MatTabChangeEvent) {
    //console.log('tab index = ', e.index);
    this.selectedTabIndex = e.index;
  }
}
