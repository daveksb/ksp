import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KspRequest, Prefix } from '@ksp/shared/interface';
import { ERequestService, GeneralInfoService } from '@ksp/shared/service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ksp-school-user-detail',
  templateUrl: './school-user-detail.component.html',
  styleUrls: ['./school-user-detail.component.scss'],
})
export class SchoolUserDetailComponent implements OnInit {
  requestData = new KspRequest();
  prefixList$!: Observable<Prefix[]>;

  constructor(
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private eRequestService: ERequestService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  form = this.fb.group({
    userInfo: [],
  });
  ngOnInit(): void {
    if (this.data.userid) {
      this.loadRequestFromId(this.data.userid);
    }
    this.prefixList$ = this.generalInfoService.getPrefix();
    if (this.data.userinfo) {
      this.data.userinfo.contactphone = this.data.userinfo.phone;
      this.form.controls.userInfo.patchValue(this.data?.userinfo);
    }
  }

  loadRequestFromId(id: number) {
    this.eRequestService.getKspRequestById(id).subscribe((res) => {
      console.log('xxx = ', res);
      this.requestData = res;
      //console.log('file = ', parseJson(res.fileinfo));

      //console.log('mode = ', this.mode);
      if (res.birthdate) {
        res.birthdate = res.birthdate.split('T')[0];
      }

      this.form.controls.userInfo.patchValue(<any>res);
      //console.log('coordinator = ', coordinator);
    });
  }
}
