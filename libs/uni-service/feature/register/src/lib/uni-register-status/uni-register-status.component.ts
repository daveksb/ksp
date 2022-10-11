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
        unitype: form.searchType?.organization,
        unicode: form.searchType?.schoolid,
        uniname: form.searchType?.instituteName
      }
      this.payload.row = 999;
      delete this.payload.searchType;
      this.search(this.payload);
    }
  }

  search(form: any) {
    this.uniRequestService.uniRequestRegisterSearch(form).subscribe(res=>{
      console.log(res)
      if (res.returncode == "00" && res.datareturn) {
        this.data = res.datareturn.map((data: any) => {
          if (data.educationoccupy) {
            data.educationoccupy = JSON.parse(data.educationoccupy);
            data.educationoccupy.permissionname = data.educationoccupy.permission == '1' 
              ? 'เจ้าหน้าที่ประสานงาน (รับรองปริญญาและประกาศนียบัตรทางการศึกษา)' :
              data.educationoccupy.permission == '1' ? 'เจ้าหน้าที่ประสานงาน (นำส่งรายชื่อผู้เข้าศึกษาและผู้สำเร็จการศึกษา​)' : '';
            data.requeststatusname = data.requeststatus == '1' ? 'กำลังดำเนินการ' :
              data.requeststatus == '1' ? 'อนุมัติเข้าใช้งาน' : 
              data.requeststatus == '1' ? 'ไม่อนุมัติเข้าใช้งาน' : '-';
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