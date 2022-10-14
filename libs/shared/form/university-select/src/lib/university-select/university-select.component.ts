import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { KspFormBaseComponent, SchoolInfo } from '@ksp/shared/interface';
import { UniversitySearchComponent } from '@ksp/shared/search';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ksp-university-select',
  templateUrl: './university-select.component.html',
  styleUrls: ['./university-select.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: providerFactory(UniversitySelectComponent),
})
export class UniversitySelectComponent extends KspFormBaseComponent {
  @Input() title = 'กรุณาเลือกสถาบันที่ท่านสังกัด';
  @Input() label1 = 'สังกัด';
  @Input() label2 = 'โรงเรียน / สถานศึกษา';
  @Input() schoolName = '';
  @Input() bureauName = '';
  @Input() address = '';
  @Input() searchType = '';
  @Input() readonly = false;
  @Input() showAddress = false;
  @Input() bureauList: any[] = [];
  @Output() selectedUniversity = new EventEmitter<SchoolInfo>();

  override form = this.fb.group({
    institution: [],
    affiliation: [],
    address: [],
  });

  constructor(public dialog: MatDialog, private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  search() {
    const dialog = this.dialog.open(UniversitySearchComponent, {
      width: '1200px',
      height: '100vh',
      position: {
        top: '0px',
        right: '0px',
      },
      data: {
        searchType: this.searchType,
        subHeader: 'กรุณาเลือกหน่วยงาน/สถานศึกษาที่ท่านสังกัด',
      },
    });
    dialog.afterClosed().subscribe((res: SchoolInfo) => {
      if (res) {
        this.selectedUniversity.emit(res);
      }
    });
  }
}
