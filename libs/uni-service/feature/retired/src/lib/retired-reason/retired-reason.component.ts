import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import localForage from 'localforage';
import { SchoolRetireReason } from '@ksp/shared/constant';
import { thaiDate } from '@ksp/shared/utility';

@Component({
  selector: 'uni-service-retired-reason',
  templateUrl: './retired-reason.component.html',
  styleUrls: ['./retired-reason.component.scss'],
})
export class RetiredReasonComponent implements OnInit {
  form = this.fb.group({
    retiredReason: [null, Validators.required],
    retiredDetail: [],
  });

  retireReason = SchoolRetireReason;
  userInfo: any = {};  
  requestNo = '';
  today = thaiDate(new Date());
  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    localForage.getItem('retireReasonData').then((res:any) => {
      if (res) {
        this.form.patchValue({
          retiredReason: res.retiredReason,
          retiredDetail: res.retiredDetail
        })
      }
    });
    localForage.getItem('userSelectedData').then((res:any) => {
      if (res) {
        this.userInfo = res;
        this.userInfo.nameth = `${this.userInfo.firstnameth ? this.userInfo.firstnameth + ' ' : ''}` +
                               `${this.userInfo.lastnameth ? this.userInfo.lastnameth : ''}`;
        this.userInfo.nameen = `${this.userInfo.firstnameen ? this.userInfo.firstnameen + ' ' : ''}` +
                               `${this.userInfo.lastnameen ? this.userInfo.lastnameen : ''}`;
        if (this.userInfo.phone) {
          this.userInfo.contactPhone = this.userInfo.phone;
        }
        this.userInfo.permissionname = this.userInfo.permissionright == '1' 
        ? 'เจ้าหน้าที่ประสานงาน (รับรองปริญญาและประกาศนียบัตรทางการศึกษา)' :
        this.userInfo.permissionright == '2' ? 'เจ้าหน้าที่ประสานงาน (นำส่งรายชื่อผู้เข้าศึกษาและผู้สำเร็จการศึกษา​)' : '';
      }
    });
  }

  next() {
    localForage.setItem('retireReasonData', this.form.getRawValue());
    this.router.navigate(['/retired', 'attachment']);
  }

  prevPage() {
    localForage.removeItem('retireReasonData');
    localForage.removeItem('userSelectedData');
    localForage.removeItem('retireCoordinatorInfo');
    this.router.navigate(['/', 'retired', 'home']);
  }

}
