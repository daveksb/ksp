import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SchoolRetireReason } from '@ksp/shared/constant';
import { SchInfo, SchUser } from '@ksp/shared/interface';
import localForage from 'localforage';
@Component({
  selector: 'ksp-school-retired-requester',
  templateUrl: './school-retired-requester.component.html',
  styleUrls: ['./school-retired-requester.component.scss'],
})
export class SchoolRetiredRequesterComponent implements OnInit {
  school = new SchInfo();
  user = new SchUser();

  form = this.fb.group({
    retiredReason: [null, Validators.required],
    retiredDetail: [null],
  });

  SchoolRetireReason = SchoolRetireReason;
  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    localForage.getItem('retiredSelectedSchool').then((res: any) => {
      this.school = res;
    });

    localForage.getItem('retiredSelectedUser').then((res: any) => {
      this.user = res;
    });
  }

  nextPage() {
    localForage.setItem('retireReasonInfoFormValue', this.form.value);
    this.router.navigate(['/retired-user', 'coordinator']);
  }

  prevPage() {
    this.router.navigate(['/retired-user', 'search']);
  }
}
