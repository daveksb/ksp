import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Bureau, SchoolInfo, SchUser } from '@ksp/shared/interface';
import { GeneralInfoService, SchoolInfoService } from '@ksp/shared/service';
import localForage from 'localforage';
import { Observable } from 'rxjs';

@Component({
  selector: 'ksp-school-retired-search',
  templateUrl: './school-retired-search.component.html',
  styleUrls: ['./school-retired-search.component.scss'],
})
export class SchoolRetiredSearchComponent implements OnInit {
  school!: SchoolInfo;
  schoolUsers: SchUser[] = [];
  selectUser!: SchUser;
  bureauList$!: Observable<Bureau[]>;

  form = this.fb.group({
    userSearch: [],
    userSelect: [],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private schoolInfoService: SchoolInfoService,
    private generalInfoService: GeneralInfoService
  ) {}

  ngOnInit(): void {
    this.bureauList$ = this.generalInfoService.getBureau();
  }

  onItemChange(selectUser: SchUser | null) {
    if (selectUser) {
      this.selectUser = selectUser;
    }
  }

  schoolSelected(school: SchoolInfo) {
    this.school = school;
    localForage.setItem('retiredSelectedSchool', school);

    this.schoolInfoService
      .searchSchUsers({ schoolid: school.schoolid })
      .subscribe((res) => {
        this.schoolUsers = res;
      });
  }

  next() {
    this.router.navigate(['/retired-user', 'requester']);
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}
