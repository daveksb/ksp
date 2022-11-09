import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Prefix } from '@ksp/shared/interface';
import { GeneralInfoService } from '@ksp/shared/service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ksp-school-user-detail',
  templateUrl: './school-user-detail.component.html',
  styleUrls: ['./school-user-detail.component.scss'],
})
export class SchoolUserDetailComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  form = this.fb.group({
    userInfo: []
  })

  prefixList$!: Observable<Prefix[]>;

  ngOnInit(): void {
    this.prefixList$ = this.generalInfoService.getPrefix();
    if (this.data.userinfo) {
      this.data.userinfo.contactphone = this.data.userinfo.phone;
      this.form.controls.userInfo.patchValue(this.data?.userinfo);
    }
  }
}
