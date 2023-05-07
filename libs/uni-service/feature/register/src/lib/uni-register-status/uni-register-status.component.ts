import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserInfoFormType } from '@ksp/shared/constant';
import { KspPaginationComponent } from '@ksp/shared/interface';
import { UniversitySearchComponent } from '@ksp/shared/search';
import { GeneralInfoService, LoaderService, UniInfoService, UniRequestService } from '@ksp/shared/service';
import { thaiDate } from '@ksp/shared/utility';
import localForage from 'localforage';
import _ from 'lodash';
import { Observable, Subject } from 'rxjs';

@Component({
  templateUrl: './uni-register-status.component.html',
  styleUrls: ['./uni-register-status.component.scss'],
})
export class UniRegisterStatusComponent extends KspPaginationComponent {
  data: Array<any> = [];
  selectedUser: any;
  payload: any = {};
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(
    private router: Router,
    private uniRequestService: UniRequestService,
    private loaderService: LoaderService
  ) {
    super();
  }

  handleClear(form: any) {
    this.handleSearch(form);
  }

  handleSearch(form: any) {
    if (form) {
      let nameData = {};
      if (form.name) {
        const newName = form.name.split(' ');
        if (newName.length > 1) {
          nameData = {
            firstname: newName[0],
            lastname: newName[1]
          }
        } else {
          nameData = {
            firstname: newName[0]
          }
        }
      }
      this.payload = {
        ...form,
        ...nameData,
        contactphone: form.phone,
        permission: form.permissionright,
        unitype: form.searchType?.bureauid,
        unicode: form.searchType?.schoolid,
        uniname: form.searchType?.schoolname,
        ...this.tableRecord
      }
      delete this.payload.searchType;
      this.searchUser(this.payload);
    }
  }

  override search(): void {
      this.handleSearch({});
  }

  searchUser(form: any) {
    this.uniRequestService.uniRequestRegisterSearch(form).subscribe(res=>{
      this.pageEvent.length = res.countrow;
      if (res.returncode == "00" && res.datareturn) {
        this.data = res.datareturn.map((data: any) => {
          if (data.educationoccupy) {
            data.educationoccupy = JSON.parse(data.educationoccupy);
            data.permissionname = data.permissionright == '1' 
              ? 'เจ้าหน้าที่ประสานงาน (รับรองปริญญาและประกาศนียบัตรทางการศึกษา)' :
              data.permissionright == '2' ? 'เจ้าหน้าที่ประสานงาน (นำส่งรายชื่อผู้เข้าศึกษาและผู้สำเร็จการศึกษา​)' : '';
            data.requeststatusname = data.status == '1' ? 'กำลังดำเนินการ' :
              data.status == '2' ? 'อนุมัติเข้าใช้งาน' : 
              data.status == '3' ? 'ไม่อนุมัติเข้าใช้งาน' : '-';
          }
          return data;
        });
      } else {
        this.data = [];
      }
    })
  }

  goLogin() {
    this.router.navigate(['/login']);
  }
}