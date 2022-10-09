import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserInfoFormType } from '@ksp/shared/constant';
import { thaiDate } from '@ksp/shared/utility';
import { Observable } from 'rxjs';

@Component({
  selector: 'ksp-qualification-approve-detail',
  templateUrl: './qualification-approve-detail.component.html',
  styleUrls: ['./qualification-approve-detail.component.scss'],
})
export class QualificationApproveDetailComponent implements OnInit {
  file = files;
  choice = verifyChoices;

  requestDate = thaiDate(new Date());
  requestNumber = '';
  userInfoFormdisplayMode: number = UserInfoFormType.thai;

  prefixList$!: Observable<any>;
  provinces1$!: Observable<any>;
  provinces2$!: Observable<any>;
  amphurs1$!: Observable<any>;
  tumbols1$!: Observable<any>;
  amphurs2$!: Observable<any>;
  tumbols2$!: Observable<any>;
  countries$!: Observable<any>;
  nationalitys$!: Observable<any>;

  form = this.fb.group({
    userInfo: [],
    addr1: [],
    addr2: [],
    edu1: [],
    edu2: [],
    edu3: [],
    edu4: [],
    checkResult: this.fb.array([]),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}

const verifyChoices = [
  {
    name: 'ครบถ้วน และถูกต้อง',
    value: 1,
  },
  {
    name: 'ไม่ครบถ้วน และไม่ถูกต้อง',
    value: 2,
  },
];

const files = [
  {
    name: 'หนังสือนำส่งจากหน่วยงานผู้ใช้',
    fileId: '',
    fileName: '',
  },
  {
    name: 'สำเนาวุฒิการศึกษาและใบรายงานผลการเรียน',
    fileId: '',
    fileName: '',
  },
  {
    name: 'สำเนาวุฒิการศึกษาและใบรายงานผลการเรียน',
    fileId: '',
    fileName: '',
  },
  {
    name: 'สำเนาทะเบียนบ้าน',
    fileId: '',
    fileName: '',
  },
  {
    name: 'สำเนาหนังสือแจ้งการเทียบคุณวุฒิ (กรณีจบการศึกษาจากต่างประเทศ)',
    fileId: '',
    fileName: '',
  },
  {
    name: 'สำเนา กพ.7 / สมุดประจำตัว',
    fileId: '',
    fileName: '',
  },
  {
    name: 'สำเนาหลักฐานการเปลี่ยนชื่อ นามสกุล',
    fileId: '',
    fileName: '',
  },
  { name: 'เอกสารอื่นๆ', fileId: '', fileName: '' },
];
