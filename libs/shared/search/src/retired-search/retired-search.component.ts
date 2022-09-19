import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { GeneralInfoService } from '@ksp/shared/service';
import { providerFactory } from '@ksp/shared/utility';
import { Observable } from 'rxjs';
import { BasicInstituteSearchComponent } from '../basic-institute-search/basic-institute-search.component';

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
    searchType: [],
    requestNumber: [],
    name: [],
    phone: [],
  });
  bureaus$!: Observable<any>;
  @Input() searchType = '';
  @Output() clear = new EventEmitter();
  @Output() search = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService
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
  }
}
