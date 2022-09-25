import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { GeneralInfoService, UniInfoService } from '@ksp/shared/service';
import { providerFactory } from '@ksp/shared/utility';
import { Observable } from 'rxjs';
import { BasicInstituteSearchComponent } from '../basic-institute-search/basic-institute-search.component';
import { uniPermissionList, UserInfoFormType } from 'libs/shared/constant/src/school-request-constant';

@Component({
  selector: 'ksp-retired-search',
  templateUrl: './retired-search.component.html',
  styleUrls: ['./retired-search.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, BasicInstituteSearchComponent,CommonModule],
  providers: providerFactory(RetiredSearchComponent),
})
export class RetiredSearchComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    permissionright: [],
    searchType: [],
    name: [],
    phone: [],
    offset: [0],
    row: [10],
    requestno: []
  });
  bureaus$!: Observable<any>;
  uniType$!: Observable<any>;
  @Input() searchType = '';
  @Output() clear = new EventEmitter();
  @Output() search = new EventEmitter();
  permissionList: Array<any> = uniPermissionList;

  constructor(
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private uniinfoService: UniInfoService
  ) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
  ngOnInit(): void {
    this.bureaus$ = this.generalInfoService.getBureau();
    this.uniType$ = this.uniinfoService.getUniversityType();
  }

  handleClear() {
    this.form.reset();
    this.form.patchValue({
      offset: 0,
      row: 10,
    })
    this.clear.emit(this.form.value);
  }
}
