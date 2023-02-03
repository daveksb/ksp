import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BasicInstituteSearchComponent } from '../basic-institute-search/basic-institute-search.component';
import { KspFormBaseComponent, Province } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { AddressService, GeneralInfoService } from '@ksp/shared/service';

@UntilDestroy()
@Component({
  selector: 'ksp-request-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BasicInstituteSearchComponent,
    MatDatepickerModule,
  ],
  templateUrl: './e-service-request-search.component.html',
  styleUrls: ['./e-service-request-search.component.scss'],
  providers: providerFactory(EServiceRequestSearchComponent),
})
export class EServiceRequestSearchComponent
  extends KspFormBaseComponent
  implements OnInit
{
  visaClassList$!: Observable<any>;
  visaTypeList$!: Observable<any>;
  countries$!: Observable<any>;

  override form = this.fb.group({
    schoolinfo: [null],
    requesttype: [null],
    requestno: [null],
    name: [null],
    requestdatefrom: [null],
    requeststatus: [null],
    visaclass: [null],
    visatype: [null],
    country: [null],
    passportno: [null],
    kurusapano: [null],
    province: [null],
  });

  @Input() isSchoolUser = true;
  @Input() showProvince = true;
  @Input() provinces: Province[] | null = [];
  @Input() bureaus: any;
  @Input() searchType = '';
  @Input() statusList: any[] | undefined = [];
  @Input() universityType: any;
  @Output() search = new EventEmitter<any>();
  @Output() clear = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService
  ) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit() {
    this.visaClassList$ = this.generalInfoService.getVisaClass();
    this.visaTypeList$ = this.generalInfoService.getVisaType();
    this.countries$ = this.addressService.getCountry();
  }

  onClear() {
    this.form.reset();
    this.clear.emit(true);
  }
}
