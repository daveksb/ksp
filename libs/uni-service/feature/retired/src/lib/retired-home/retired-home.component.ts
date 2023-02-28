import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService, UniRequestService } from '@ksp/shared/service';
import localForage from 'localforage';
import { KspPaginationComponent } from '@ksp/shared/interface';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './retired-home.component.html',
  styleUrls: ['./retired-home.component.scss'],
})
export class RetiredHomeComponent extends KspPaginationComponent {
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
    this.selectedUser = null;
    this.handleSearch(form);
  }

  handleSearch(form: any) {
    console.log(form)
    if (form) {
      let nameData = {};
      if (form.name) {
        const newName = form.name.split(' ');
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
        unitype: form.searchType?.bureauid,
        unicode: form.searchType?.schoolid,
        uniname: form.searchType?.schoolname,
        ...this.tableRecord
      }
      delete this.payload.searchType;
      this.searchUser(this.payload);
    }
  }

  // override search(): void {
  //     this.handleSearch({});
  // }

  searchUser(form: any) {
    console.log(form)
    this.uniRequestService.searchUniRequest(form).subscribe(res=>{
      console.log(res)
      this.pageEvent.length = res.countrow;
      if (res.returncode == "00" && res.datareturn) {
        this.data = res.datareturn.map((data: any) => {
          data.permissionname = data.permissionright == '1' 
          ? 'เจ้าหน้าที่ประสานงาน (รับรองปริญญาและประกาศนียบัตรทางการศึกษา)' :
          data.permissionright == '2' ? 'เจ้าหน้าที่ประสานงาน (นำส่งรายชื่อผู้เข้าศึกษาและผู้สำเร็จการศึกษา​)' : '';
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
    localForage.setItem('userSelectedData', this.selectedUser).then(()=>{
      this.router.navigate(['/retired', 'reason']);
    });
  }

}