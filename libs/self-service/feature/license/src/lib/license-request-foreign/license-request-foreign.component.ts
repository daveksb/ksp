import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';
import { FormBuilder } from '@angular/forms';
import { SelfRequest } from '@ksp/shared/interface';
import { replaceEmptyWithNull, toLowercaseProp } from '@ksp/shared/utility';
import {
  SelfServiceRequestForType,
  SelfServiceRequestSubType,
  SelfServiceRequestType,
} from '@ksp/shared/constant';
import { SelfRequestService } from '@ksp/shared/service';
import * as _ from 'lodash';
import { getCookie } from '@ksp/shared/utility';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'self-service-license-request-foreign',
  templateUrl: './license-request-foreign.component.html',
  styleUrls: ['./license-request-foreign.component.scss'],
})
export class LicenseRequestForeignComponent implements OnInit {
  headerGroup = ['Issue Date', 'Form ID'];
  title = 'TEACHING LICENSE APPLICATION FORM';

  form = this.fb.group({
    personalDetail: [],
    personalDeclaration: [],
  });

  attachFiles: any[] = [];
  uniqueTimestamp!: string;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private requestService: SelfRequestService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.uniqueTimestamp = uuidv4();
  }

  cancel() {
    this.router.navigate(['/home']);
  }

  save() {
    console.log(this.form.getRawValue());
    console.log(this.attachFiles);
    const completeDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `Do you want to save and proceed?`,
        btnLabel: 'Save & Proceed',
        cancelBtnLabel: ' Save (Draft)',
      },
    });

    completeDialog.componentInstance.saved.subscribe((res) => {
      if (res) {
        const payload = this.createRequest(1);
        this.requestService.createRequest(payload).subscribe((res) => {
          //console.log('request result = ', res);
          if (res.returncode === '00') {
            this.router.navigate(['/home']);
          }
        });
      }
    });

    completeDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        const payload = this.createRequest(2);
        this.requestService.createRequest(payload).subscribe((res) => {
          console.log('request result = ', res);
          if (res.returncode === '00') {
            this.router.navigate(['/license', 'payment-channel']);
          }
        });
      }
    });
  }

  createRequest(currentProcess: number) {
    const type =
      this.route.snapshot.queryParamMap.get('type') ||
      SelfServiceRequestSubType.ครู;
    const self = new SelfRequest(
      '1',
      SelfServiceRequestType.ขอขึ้นทะเบียนใบอนุญาตประกอบวิชาชีพ,
      `${type}`,
      currentProcess
    );
    const allowKey = Object.keys(self);
    const formData: any = this.form.getRawValue();
    const {
      addressForm,
      workplaceForm,
      academicForm,
      grantionLicenseForm,
      ...userInfoForm
    } = formData.personalDetail;

    const { id, ...rawUserInfo } = userInfoForm;
    const userInfo = toLowercaseProp(rawUserInfo);
    userInfo.requestfor = `${SelfServiceRequestForType.ชาวต่างชาติ}`;
    userInfo.uniquetimestamp = this.uniqueTimestamp;
    userInfo.staffid = getCookie('userId');

    const selectData = _.pick(userInfo, allowKey);

    const { addressName, addressForm: resWorkplaceForm } = workplaceForm;
    const documentfiles = this.mapFileInfo(this.attachFiles);

    const payload = {
      ...self,
      ...replaceEmptyWithNull(selectData),
      ...{
        addressinfo: JSON.stringify([addressForm]),
      },
      ...{
        schooladdrinfo: JSON.stringify({
          addressName,
          ...resWorkplaceForm,
        }),
      },
      ...{ eduinfo: JSON.stringify(academicForm) },
      ...{
        grantionteachinglicenseinfo: JSON.stringify(grantionLicenseForm),
      },
      ...{
        checkProhibitProperty: JSON.stringify(formData.personalDeclaration),
      },
      ...{ fileinfo: JSON.stringify({ documentfiles }) },
    };
    console.log(payload);
    return payload;
  }

  onFileUpdate(files: any[]) {
    this.attachFiles = files;
  }

  mapFileInfo(fileList: any[]) {
    return fileList.map((file: any) => {
      const object = {
        fileid: file.fileId || null,
        filename: file.fileName || null,
        name: file.name || null,
      };
      return object;
    });
  }
}
