import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StaffSearchDialogComponent } from '@ksp/school-service/ui/staff-search';
import { SchoolRequestType, UserInfoFormType } from '@ksp/shared/constant';
import {
  Country,
  KspFormBaseComponent,
  Nationality,
  Prefix,
  VisaClass,
  VisaType,
} from '@ksp/shared/interface';
import {
  createUserInfoForm,
  providerFactory,
  validatorMessages,
} from '@ksp/shared/utility';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'ksp-form-user-info',
  templateUrl: './form-user-info.component.html',
  styleUrls: ['./form-user-info.component.scss'],
  providers: providerFactory(FormUserInfoComponent),
})
export class FormUserInfoComponent
  extends KspFormBaseComponent
  implements OnInit, OnChanges
{
  @Input() prefixList: Prefix[] | null = [];
  @Input() countryList: Country[] | null = [];
  @Input() nationList: Nationality[] | null = [];
  @Input() visaClassList: VisaClass[] | null = [];
  @Input() visaTypeList: VisaType[] | null = [];
  @Input() isqualification = false;
  @Input() isDarkMode = false;
  @Input() isSelfService = false;
  @Input() isAddStaff = false;
  @Input() requiredIdCardNo = true;
  @Input() isHasSixtiesDate = false;
  @Input() showSearchBtn = false;
  @Input() lbl_lettertype: string | null = 'ประเภทการยื่น';

  public _displayMode = UserInfoFormType.thai;
  @Input()
  set displayMode(mode: number) {
    this._displayMode = mode;
    this.checkValidators(mode);
  }
  get displayMode(): number {
    return this._displayMode;
  }

  @Output() idCardChange = new EventEmitter<string>();
  @Output() kuruspaNoChange = new EventEmitter<string>();

  today = new Date();
  RequestTypeEnum = SchoolRequestType;
  validatorMessages = validatorMessages;
  FormTypeEnum = UserInfoFormType;
  override form = createUserInfoForm(this.fb);

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.subscribe((value: any) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  checkValidators(mode: number) {
    // คนไทยไม่ต้อง validate field เหล่านี้
    if (mode === UserInfoFormType.thai) {
      //console.log('aaa = ');
      this.form.controls.passportno.clearValidators();
      this.form.controls.kuruspano.clearValidators();
      this.form.controls.passportstartdate.clearValidators();
      this.form.controls.passportenddate.clearValidators();
      this.form.controls.position.clearValidators();
      this.form.controls.workphone.clearValidators();
      this.form.controls.nationality.clearValidators();
    }

    // ต่างชาติ ไม่ต้อง validate field เหล่านี้
    if (mode === UserInfoFormType.foreign) {
      this.workPhone.clearValidators();
      this.contactPhone.clearValidators();
      this.form.controls.position.clearValidators();
      this.form.controls.sex.clearValidators();
      this.form.controls.email.clearValidators();
      this.form.controls.isforeign.clearValidators();
      this.idCardNo.clearValidators();
      this.idCardNo.updateValueAndValidity();
      //console.log('ccc = ', this.idCardNo.valid);
    }

    if (this.isSelfService) {
      this.idCardNo.clearValidators();
    }
  }

  ngOnInit(): void {
    this.checkValidators(this._displayMode);

    this.form.controls.idcardno.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((res) => {
        //console.log('id = ', this.form.controls.idcardno.valid);
        if (res && res.length === 13 && this.idCardNo.valid) {
          this.idCardChange.emit(res);
        }
      });

    this.form.controls.kuruspano.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((res) => {
        if (res && res.length === 13) {
          this.kuruspaNoChange.emit(res);
        }
      });
  }

  override ngOnChanges(changes: SimpleChanges): void {
    if (changes['requiredIdCardNo']) {
      if (this.requiredIdCardNo === false) {
        this.idCardNo.clearValidators();
        this.idCardNo.updateValueAndValidity();
      }
    }

    if (this.mode === 'view') {
      this.form.clearValidators();
    }
  }

  prefixChanged(evt: any) {
    const prefix = evt.target?.value;
    if (prefix === '1') {
      const temp: any = { sex: '1' };
      this.form.patchValue(temp);
    } else if (['2', '3', '4', '5'].includes(prefix)) {
      const temp: any = { sex: '2' };
      this.form.patchValue(temp);
    } else {
      const temp: any = { sex: '3' };
      this.form.patchValue(temp);
    }
    const en = { prefixen: prefix };
    const th = { prefixth: prefix };
    this.form.patchValue(th);
    this.form.patchValue(en);
  }

  searchStaffDialog(stafftype: any) {
    const dialogRef = this.dialog.open(StaffSearchDialogComponent, {
      width: '1200px',
      height: '100vh',
      position: {
        top: '0px',
        right: '0px',
      },
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      if (response) {
        if (stafftype === UserInfoFormType.thai) {
          this.idCardNo.patchValue(response);
        } else {
          this.kuruspaNo.patchValue(response);
        }
      }
    });
  }

  get idCardNo() {
    return this.form.controls.idcardno;
  }

  get kuruspaNo() {
    return this.form.controls.kuruspano;
  }

  get passportNo() {
    return this.form.controls.passportno;
  }

  get firstNameTh() {
    return this.form.controls.firstnameth;
  }

  get lastNameTh() {
    return this.form.controls.lastnameth;
  }

  get firstNameEn() {
    return this.form.controls.firstnameen;
  }

  get lastNameEn() {
    return this.form.controls.lastnameen;
  }

  get contactPhone() {
    return this.form.controls.contactphone;
  }

  get workPhone() {
    return this.form.controls.workphone;
  }

  get email() {
    return this.form.controls.email;
  }
}
