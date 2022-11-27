import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Bureau, SchInfo, SchUser } from '@ksp/shared/interface';
import { GeneralInfoService, SchoolInfoService } from '@ksp/shared/service';
import localForage from 'localforage';
import { Observable } from 'rxjs';

@Component({
  selector: 'ksp-school-retired-search',
  templateUrl: './school-retired-search.component.html',
  styleUrls: ['./school-retired-search.component.scss'],
})
export class SchoolRetiredSearchComponent implements OnInit {
  school!: SchInfo;
  schoolUsers: SchUser[] = [];
  selectUser!: SchUser;
  bureauList$!: Observable<Bureau[]>;
  searchEnd = false;
  notFound = false;

  schoolName: any;
  bureauName: any;

  form = this.fb.group({
    userSearch: [],
    userSelect: [null, Validators.required],
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
      localForage.setItem('retiredSelectedUser', selectUser);
    }
  }

  schoolSelected(school: SchInfo) {
    this.school = school;
    localForage.setItem('retiredSelectedSchool', school);

    this.resetForm();

    this.schoolName = school.schoolname;
    this.bureauName = school.bureauname;

    this.schoolInfoService
      .searchSchUsers({ schoolid: school.schoolid })
      .subscribe((res) => {
        this.searchEnd = true;
        this.schoolUsers = res.filter((user) => user.schuseractive === '1');

        //console.log('xxx = ', this.schoolUsers);
      });
  }

  resetForm() {
    this.schoolUsers.length = 0;
    this.form.controls.userSelect.reset();
  }

  next() {
    this.router.navigate(['/retired-user', 'requester']);
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}
