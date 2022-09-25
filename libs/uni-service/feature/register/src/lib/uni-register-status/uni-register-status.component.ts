import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import { UniversitySearchComponent } from '@ksp/shared/search';
import { GeneralInfoService, UniInfoService, UniRequestService } from '@ksp/shared/service';
import { thaiDate } from '@ksp/shared/utility';
import localForage from 'localforage';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './uni-register-status.component.html',
  styleUrls: ['./uni-register-status.component.scss'],
})
export class UniRegisterStatusComponent implements OnInit {
  data: Array<any> = [];
  selectedUser: any;
  payload: any = {};
  constructor(
    private router: Router,
    private uniRequestService: UniRequestService
  ) {}

  ngOnInit(): void {}

  handleClear(form: any) {
    this.handleSearch(form);
  }

  handleSearch(form: any) {
    if (form) {
      let nameData = {};
      if (form.name) {
        let newName = form.name.split(' ');
        if (newName.length > 1) {
          nameData = {
            firstnameth: newName[0],
            lastnameth: newName[1]
          }
        } else {
          nameData = {
            firstnameth: newName[0]
          }
        }
      }
      this.payload = {
        ...form,
        ...nameData,
        unitype: form.searchType?.organization,
        unicode: form.searchType?.schoolid,
        uniname: form.searchType?.instituteName
      }
      delete this.payload.searchType;
      this.search(this.payload);
    }
  }

  search(form: any) {
    this.uniRequestService.searchUniRequest(form).subscribe(res=>{
      console.log(res)
      if (res.returncode == "00" && res.datareturn) {
        this.data = res.datareturn;
      } else {
        this.data = [];
      }
    })
  }

  onItemChange(user: any) {
    this.selectedUser = user;
  }

  next() {
    localForage.setItem('userSelectedData', this.selectedUser);
    this.router.navigate(['/retired', 'reason']);
  }

}