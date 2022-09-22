import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '@ksp/shared/dialog';
import { FormBuilder } from '@angular/forms';
import { SchoolRequest } from '@ksp/shared/interface';
import { replaceEmptyWithNull, toLowercaseProp } from '@ksp/shared/utility';
import { SelfServiceRequestSubType } from '@ksp/shared/constant';
import { SelfRequestService } from '@ksp/shared/service';

@Component({
  selector: 'self-service-license-request-foreign',
  templateUrl: './license-request-foreign.component.html',
  styleUrls: ['./license-request-foreign.component.scss'],
})
export class LicenseRequestForeignComponent {
  headerGroup = ['Issue Date', 'Form ID'];
  title = 'TEACHING LICENSE APPLICATION FORM';

  form = this.fb.group({
    personalDetail: [],
    personalDeclaration: [],
  });

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private requestService: SelfRequestService,
    private route: ActivatedRoute
  ) {}

  cancel() {
    this.router.navigate(['/home']);
  }

  save() {
    console.log(this.form.getRawValue());
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
        const payload = this.createRequest('0');
        this.requestService.createRequest(payload).subscribe((res) => {
          console.log('request result = ', res);
          if (res.returncode === '00') {
            this.router.navigate(['/home']);
          }
        });
      }
    });

    completeDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        const payload = this.createRequest('1');
        this.requestService.createRequest(payload).subscribe((res) => {
          console.log('request result = ', res);
          if (res.returncode === '00') {
            this.router.navigate(['/license', 'payment-channel']);
          }
        });
      }
    });
  }

  createRequest(currentProcess: string) {
    const baseForm = this.fb.group(SchoolRequest);
    const formData: any = this.form.getRawValue();
    const {
      addresForm,
      workplaceForm,
      academicForm,
      grantionLicenseForm,
      ...userInfoForm
    } = formData.personalDetail;

    const { id, ...rawUserInfo } = userInfoForm;
    const userInfo = toLowercaseProp(rawUserInfo);
    const type =
      this.route.snapshot.queryParamMap.get('type') ||
      SelfServiceRequestSubType.ครู;

    userInfo.ref1 = '1';
    userInfo.ref2 = '01';
    userInfo.ref3 = `${type}`;
    userInfo.systemtype = '1';
    userInfo.requesttype = '1';
    userInfo.subtype = '5';

    const { addressName, addressForm: resWorkplaceForm } = workplaceForm;

    const payload = {
      ...replaceEmptyWithNull(userInfo),
      ...{
        addressinfo: JSON.stringify([addresForm]),
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
    };
    payload.currentprocess = currentProcess;
    payload.requeststatus = '1';
    console.log(payload);
    baseForm.patchValue(payload);
    return baseForm.value;
  }
}
