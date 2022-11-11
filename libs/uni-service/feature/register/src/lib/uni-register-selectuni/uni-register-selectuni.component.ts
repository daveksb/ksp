import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SchoolInfoService } from '@ksp/shared/service';
import localForage from 'localforage';

@Component({
  templateUrl: './uni-register-selectuni.component.html',
  styleUrls: ['./uni-register-selectuni.component.scss'],
})
export class UniRegisterSelectUniComponent {
  activeUser = '';
  school!: any;
  form = this.fb.group({
    universityInfo: [{}]
  });
  constructor(
    public router: Router,
    private schoolInfoService: SchoolInfoService,
    private fb: FormBuilder,
  ) {}

  next() {
    this.router.navigate(['/register', 'requester']);
  }

  back() {
    this.router.navigate(['/login']);
  }

  selectedUniversity(university: any) {
    const formuni = {
      schoolid: university.id,
      uniid: university.id,
      unitype: university.typeid,
      institution: university.name,
      affiliation: university.nametype,
      unicode: university.universitycode,
      uniname: university.name,
      unitypename: university.nametype
    }
    localForage.setItem('registerSelectedUniversity', formuni).then(()=>{
      this.next();
    });
  }
}
