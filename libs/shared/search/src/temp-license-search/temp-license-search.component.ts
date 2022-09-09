import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ksp-temp-license-search',
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './temp-license-search.component.html',
  styleUrls: ['./temp-license-search.component.scss'],
  providers: providerFactory(TempLicenseSearchComponent),
})
export class TempLicenseSearchComponent extends KspFormBaseComponent {
  @Output() clear = new EventEmitter<boolean>(false);
  @Output() search = new EventEmitter<any>();
  @Input() eduOccupyList: any[] = [];

  override form = this.fb.group({
    requestno: [null],
    idcardno: [null],
    requesttype: [null],
    currentprocess: [null],
    requeststatus: [null],
    requestdatefrom: [null],
    requestdateto: [null],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
}
