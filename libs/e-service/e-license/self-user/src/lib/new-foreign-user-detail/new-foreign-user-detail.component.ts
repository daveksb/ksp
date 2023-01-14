import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormMode, KspRequest } from '@ksp/shared/interface';
import {
  AddressService,
  ERequestService,
  GeneralInfoService,
} from '@ksp/shared/service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ksp-new-foreign-user-detail',
  templateUrl: './new-foreign-user-detail.component.html',
  styleUrls: ['./new-foreign-user-detail.component.scss'],
})
export class NewForeignUserDetailComponent implements OnInit {
  nationalitys$!: Observable<any>;
  prefixList$!: Observable<any>;
  countries$!: Observable<any>;
  visaClassList$!: Observable<any>;
  visaTypeList$!: Observable<any>;
  mode: FormMode = 'view';
  approveChoices = approveChoices;
  checkedResult: any;
  kspRequest = new KspRequest();

  form = this.fb.group({
    kuruspano: [null],
    prefixen: [null],
    firstnameen: [null],
    middlenameen: [null],
    lastnameen: [null],
    birthdate: [null],
    country: [null],
    nationality: [null],
    contactphone: [null],
    email: [null],
    idcardno: [null],
    passportno: [null],
    passportstartdate: [null],
    passportenddate: [null],
    visaclass: [null],
    visatype: [null],
    visaenddate: [null],
  });

  constructor(
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private eRequestService: ERequestService
  ) {}

  ngOnInit(): void {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.countries$ = this.addressService.getCountry();
    this.nationalitys$ = this.generalInfoService.getNationality();
    this.visaClassList$ = this.generalInfoService.getVisaClass();
    this.visaTypeList$ = this.generalInfoService.getVisaType();
    this.form.disable();
    this.checkRequestId();
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      const requestId = Number(params.get('id'));
      console.log('request id = ', requestId);
      if (requestId) {
        this.loadRequestFromId(requestId);
      }
    });
  }

  loadRequestFromId(id: number) {
    this.eRequestService.getKspRequestById(id).subscribe((res) => {
      console.log('request data = ', res);
      this.kspRequest = res;
      this.form.patchValue(<any>res);
      /*
      const data: any = res;
      this.form.controls.userInfo.patchValue(data);

      const coordinator = parseJson(res.coordinatorinfo);
      //console.log('coordinator = ', res);
      this.form.controls.coordinatorInfo.patchValue(coordinator.coordinator); */
    });
  }

  cancel() {
    this.router.navigate(['self-user', 'new-user-list']);
  }
}

const approveChoices = [
  {
    name: 'อนุมัติ',
    value: 1,
  },
  {
    name: 'ไม่อนุมัติ',
    value: 0,
  },
];
