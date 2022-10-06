import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { KspFormBaseComponent, SelfMyInfo } from '@ksp/shared/interface';
import {
  AddressService,
  EducationDetailService,
  MyInfoService,
} from '@ksp/shared/service';
import { providerFactory } from '@ksp/shared/utility';
import { Observable } from 'rxjs';
import { replaceEmptyWithNull } from '@ksp/shared/utility';
import { FileGroup } from '@ksp/shared/constant';

@Component({
  selector: 'self-service-profession-experience',
  templateUrl: './profession-experience.component.html',
  styleUrls: ['./profession-experience.component.scss'],
  providers: providerFactory(ProfessionExperienceComponent),
})
export class ProfessionExperienceComponent
  extends KspFormBaseComponent
  implements OnInit
{
  infoFiles: FileGroup[] = [
    { name: 'สำเนาใบรายงานผลการศึกษา (transcript)', files: [] },
    {
      name: 'สำเนาปริญญาบัตร หรือสำเนาหนังสือรับรองคุณวุฒิ',
      files: [],
    },
    { name: 'สำเนาหนังสือนำส่งแบบประเมินฉบับจริง', files: [] },
    {
      name: 'สำเนาคำสั่งแต่งตั้งคณะผู้ประเมินการปฏิบัติการสอน',
      files: [],
    },
    { name: 'สำเนาตารางสอนรายสัปดาห์  ', files: [] },
    { name: 'สำเนาคำสั่งแต่งตั้งปฏิบัติหน้าที่', files: [] },
    {
      name: 'สำเนาสัญญาจ้างหรือทะเบียนประวัติหรือหลักฐานการขอปฏิบัติการสอน',
      files: [],
    },
  ];
  override form = this.fb.group({
    licenseInfo1: this.fb.array([]),
    licenseInfo2: this.fb.array([]),
    licenseInfo3: this.fb.array([]),
  });
  amphurs1$!: Observable<any>;
  tumbols1$!: Observable<any>;
  bureau$!: Observable<any>;
  provinces1$!: Observable<any>;
  countries$!: Observable<any>;
  licenses$!: Observable<any>;
  baseForm = this.fb.group(new SelfMyInfo());
  mapping: { [key: number]: any } = {
    0: this.licenseInfo1,
    1: this.licenseInfo2,
    2: this.licenseInfo3,
  };
  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private educationDetailService: EducationDetailService,
    private myInfoService: MyInfoService
  ) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
    this.countries$ = this.addressService.getCountry();
    this.bureau$ = this.educationDetailService.getBureau();
    this.provinces1$ = this.addressService.getProvinces();
    this.licenses$ = this.educationDetailService.getLicenseType();
    this.myInfoService.getMyInfo().subscribe((res) => {
      res = this.myInfoService.formatMyInfo(res);
      this.baseForm.patchValue(res);
      const experienceinfo = JSON.parse(res.experienceinfo as string);
      let index = 0;
      for (const key in experienceinfo) {
        if (key == 'fileList') continue;
        for (let i = 0; i < experienceinfo[key].length; i++) {
          this.addFormArray(index);
        }
        index++;
      }
      this.patchFileId(this.infoFiles, experienceinfo.fileList);
      this.form.patchValue(experienceinfo);
    });
  }

  setDefaulFormValue() {
    this.addFormArray(0);
    this.addFormArray(1);
    this.addFormArray(2);
  }

  deleteFormArray(form: FormArray<any>, index: number) {
    form.removeAt(index);
  }

  addFormArray(index: number) {
    const form = this.mapping[index];
    const data = this.fb.group({ licenseForm: [''] });
    form.push(data);
  }

  get licenseInfo1() {
    return this.form.controls['licenseInfo1'] as FormArray;
  }

  get licenseInfo2() {
    return this.form.controls['licenseInfo2'] as FormArray;
  }

  get licenseInfo3() {
    return this.form.controls['licenseInfo3'] as FormArray;
  }
  onSave() {
    const formData = this.form.value;
    const fileList = this.mapFileInfo(this.infoFiles);
    console.log(fileList);
    this.baseForm.patchValue({
      experienceinfo: JSON.stringify({ ...formData, fileList: fileList }),
    });
    const payload: SelfMyInfo = replaceEmptyWithNull(this.baseForm.value);
    this.myInfoService
      .updateMyInfo(payload)
      .subscribe((res) => console.log(res));
  }
  public provinceChanged(addrType: number, evt: any) {
    const province = evt.target?.value;
    if (province) {
      if (addrType === 1) {
        this.amphurs1$ = this.addressService.getAmphurs(province);
      }
    }
  }

  public amphurChanged(addrType: number, evt: any) {
    const amphur = evt.target?.value;
    if (amphur) {
      if (addrType === 1) {
        this.tumbols1$ = this.addressService.getTumbols(amphur);
      }
    }
  }
  mapFileInfo(fileList: any[]) {
    return fileList.map((file: any) => {
      const object = {
        fileid: file.fileid || null,
        filename: file.filename || null,
      };
      return object;
    });
  }
  patchFileId(fileList: any, tab: any) {
    for (let i = 0; i < fileList.length; i++) {
      fileList[i].fileid = tab[i]?.fileid;
      fileList[i].filename = tab[i]?.filename;
    }
    return fileList;
  }
}
