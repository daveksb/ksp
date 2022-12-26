import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KspRequest, PersonType, Prefix } from '@ksp/shared/interface';
import {
  ERequestService,
  GeneralInfoService,
  SchoolInfoService,
} from '@ksp/shared/service';
import { parseJson } from '@ksp/shared/utility';
import { Observable } from 'rxjs';

@Component({
  selector: 'ksp-osoi-detail',
  templateUrl: './osoi-detail.component.html',
  styleUrls: ['./osoi-detail.component.scss'],
})
export class OsoiDetailComponent implements OnInit {
  requestId!: number;
  requestData: any;
  osoiTypes$!: Observable<any>;
  personTypes$!: Observable<PersonType[]>;
  prefixList$!: Observable<Prefix[]>;
  memberData: any;
  rewardFiles: any[] = [];

  form = this.fb.group({
    rewardInfo: [],
  });

  constructor(
    private router: Router,
    private requestService: ERequestService,
    protected route: ActivatedRoute,
    private fb: FormBuilder,
    private schoolInfoService: SchoolInfoService,
    private generalInfoService: GeneralInfoService
  ) {}

  ngOnInit(): void {
    this.checkRequestId();
    this.getListData();
  }

  getListData() {
    this.osoiTypes$ = this.schoolInfoService.getOsoiTypes();
    this.personTypes$ = this.schoolInfoService.getPersonTypes();
    this.prefixList$ = this.generalInfoService.getPrefix();
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        this.requestService
          .getKspRequestById(this.requestId)
          .subscribe((res) => {
            if (res) {
              this.requestData = res;
              this.patchData(res);
            }
          });
      }
    });
  }

  patchData(data: any) {
    const osoiinfo = parseJson(data.osoiinfo);

    const rewardInfo = {
      idcardno: data.idcardno,
      prefixth: data.prefixth,
      firstnameth: data.firstnameth,
      lastnameth: data.lasttnameth,
      contactphone: data.contactphone,
      email: data.email,

      rewardname: osoiinfo.rewardname,
      rewardtype: osoiinfo.rewardtype,
      submitbefore: osoiinfo.submitbefore,
      vdolink: osoiinfo.vdolink,
    };
    console.log('data = ', rewardInfo);

    this.form.controls.rewardInfo.patchValue(<any>rewardInfo);

    const osoiMember = parseJson(data.osoimember);
    this.memberData = osoiMember;

    if (data.fileinfo) {
      const rewardfiles = parseJson(data.fileinfo);
      this.rewardFiles = rewardfiles;
    }
  }

  next(id: number) {
    this.router.navigate(['/one-school-one-innovation', 'confirm', id]);
  }

  cancel() {
    this.router.navigate(['/one-school-one-innovation', 'list']);
  }
}
