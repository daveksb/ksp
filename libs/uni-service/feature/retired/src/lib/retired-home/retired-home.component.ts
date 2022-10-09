import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UniRequestService } from '@ksp/shared/service';
import { Observable } from 'rxjs';
import localForage from 'localforage';

@Component({
  templateUrl: './retired-home.component.html',
  styleUrls: ['./retired-home.component.scss'],
})
export class RetiredHomeComponent implements OnInit {
  data: Array<any> = [];
  selectedUser: any;
  payload: any = {};
  constructor(
    private router: Router,
    private uniRequestService: UniRequestService
  ) {}

  ngOnInit(): void {}

  handleClear(form: any) {
    this.selectedUser = null;
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
      this.payload.row = 999;
      delete this.payload.searchType;
      this.search(this.payload);
    }
  }

  search(form: any) {
    this.uniRequestService.searchUniRequest(form).subscribe(res=>{
      console.log(res)
      if (res.returncode == "00" && res.datareturn) {
        this.data = res.datareturn.map((data: any) => {
          data.permissionname = data.permissionright == '1' 
          ? 'เจ้าหน้าที่ประสานงาน (รับรองปริญญาและประกาศนียบัตรทางการศึกษา)' :
          data.permissionright == '1' ? 'เจ้าหน้าที่ประสานงาน (นำส่งรายชื่อผู้เข้าศึกษาและผู้สำเร็จการศึกษา​)' : '';
          return data;
        });
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